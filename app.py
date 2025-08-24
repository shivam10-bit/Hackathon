import os, io, json, shutil, tempfile
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import requests
from PIL import Image
from shapely.geometry import shape, Point
import geojson
from geometry import estimate_hfov_deg, bbox_real_size
import google.generativeai as genai

# -------- Load environment --------
load_dotenv()
app = FastAPI(title="Billboard Compliance Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- API Keys & Configuration --------
RF_MODEL_URL = os.getenv("ROBOFLOW_MODEL_URL")
RF_API_KEY = os.getenv("ROBOFLOW_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not RF_MODEL_URL or not RF_API_KEY or not GOOGLE_API_KEY:
    raise RuntimeError("❌ Missing critical API keys in .env file")

# Configure the Gemini client
genai.configure(api_key=GOOGLE_API_KEY)

# -------- Load Static Assets --------
with open("policy_rules.json", "r", encoding="utf-8") as f:
    POLICY = json.load(f)

ZONES = []
if os.path.exists("zones.geojson"):
    with open("zones.geojson", "r", encoding="utf-8") as f:
        gj = geojson.load(f)
        for feat in gj["features"]:
            ZONES.append({
                "name": feat["properties"].get("name", "zone"),
                "type": feat["properties"].get("type", "allowed"),
                "geom": shape(feat["geometry"])
            })

# -------- Data Models --------
class AnalyzeResponse(BaseModel):
    label: str
    score: int
    reasons: List[str]
    violations: List[Dict[str, Any]]
    estimated_size_m: Optional[Dict[str, float]] = None
    zone_hit: Optional[str] = None
    rf_raw: Optional[dict] = None

# -------- Helper Functions --------
def call_roboflow(image_bytes: bytes) -> dict:
    """Send image to Roboflow and return detections."""
    files = {"file": ("upload.jpg", image_bytes, "image/jpeg")}
    url = f"{RF_MODEL_URL}?api_key={RF_API_KEY}"
    response = requests.post(url, files=files, timeout=20) # Added timeout
    response.raise_for_status() # Raises an exception for bad status codes
    return response.json()

def point_zone(lat: float, lon: float) -> Optional[dict]:
    """Check if a GPS point falls within a defined zone."""
    if not ZONES:
        return None
    pt = Point(lon, lat)
    for z in ZONES:
        if z["geom"].contains(pt):
            return {"name": z["name"], "type": z["type"]}
    return None

def llm_verdict(policy: dict, facts: dict) -> dict:
    """Call Google Gemini to get the final compliance verdict."""
    
    # Using the latest model name and the older, more compatible mime_type parameter
    model = genai.GenerativeModel('gemini-1.5-pro-latest')
    generation_config = genai.GenerationConfig(
        temperature=0,
        response_mime_type="application/json"
    )

    prompt = f"""
    You are a compliance engine for billboard ads. Your task is to determine if a
    billboard is 'AUTHORIZED', 'ILLEGAL', or 'INCONCLUSIVE' based on a set of policy
    rules and observed facts.

    Your response MUST be a JSON object that strictly follows this schema:
    {{
        "label": "AUTHORIZED | ILLEGAL | INCONCLUSIVE",
        "score": <integer between 0 (non-compliant) and 100 (fully-compliant)>,
        "reasons": ["<string reason for the verdict>"],
        "violations": [
            {{
                "rule": "<The specific rule from the policy that was violated>",
                "details": "<A description of how the billboard violated the rule>"
            }}
        ]
    }}
    The 'violations' array must be empty if the label is 'AUTHORIZED'.

    Here is the data to analyze:
    Policy Rules: {json.dumps(policy)}
    Observed Facts: {json.dumps(facts)}
    """

    try:
        resp = model.generate_content(prompt, generation_config=generation_config)
        # Robustly clean the response before parsing
        cleaned_text = resp.text.strip().replace("```json", "").replace("```", "")
        return json.loads(cleaned_text)
    except Exception as e:
        # Provide a more informative error message
        return {
            "label": "INCONCLUSIVE",
            "score": 50,
            "reasons": [f"Error communicating with Gemini API: {str(e)}"],
            "violations": []
        }

# -------- Main API Endpoints --------
@app.get("/")
async def root():
    return {"message": "Billboard Compliance API is running. See /docs for usage."}

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(
    image: UploadFile = File(...),
    lat: Optional[float] = Form(None),
    lon: Optional[float] = Form(None),
    qr_verified: bool = Form(False),
    has_tobacco_alcohol: bool = Form(False),
    distance_m: Optional[float] = Form(None)
):
    img_bytes = await image.read()

    hfov = 60.0
    img_w, img_h = None, None
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
        tmp.write(img_bytes)
        tmp_path = tmp.name
    try:
        with Image.open(tmp_path) as im:
            img_w, img_h = im.size
        hfov = estimate_hfov_deg(tmp_path)
    except Exception as e:
        print(f"Warning: Could not read image metadata. Using defaults. Error: {e}")
    finally:
        os.remove(tmp_path)

    try:
        rf_json = call_roboflow(img_bytes)
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Roboflow API call failed: {e}")

    zone = point_zone(lat, lon) if (lat is not None and lon is not None) else None
    zone_hit = zone["name"] if zone else None

    estimated_size = None
    if distance_m and img_w and rf_json.get("predictions"):
        main_bbox = max(rf_json["predictions"], key=lambda p: p['width'] * p['height'])
        bbox_xywh = (main_bbox['x'], main_bbox['y'], main_bbox['width'], main_bbox['height'])
        w_m, h_m = bbox_real_size(img_w, img_h, bbox_xywh, hfov, distance_m)
        if w_m is not None:
            estimated_size = {"width_m": round(w_m, 2), "height_m": round(h_m, 2)}

    facts = {
        "permit": {"qr_verified": qr_verified},
        "has_tobacco_alcohol": has_tobacco_alcohol,
        "detections": rf_json.get("predictions", []),
        "zone": zone,
        "image_w": img_w, "image_h": img_h,
        "estimated_size_m": estimated_size
    }

    verdict = llm_verdict(POLICY, facts)

    return {
        "label": verdict.get("label", "INCONCLUSIVE"),
        "score": int(verdict.get("score", 50)),
        "reasons": verdict.get("reasons", []),
        "violations": verdict.get("violations", []),
        "estimated_size_m": estimated_size,
        "zone_hit": zone_hit,
        "rf_raw": rf_json
    }
