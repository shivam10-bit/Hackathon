import math
from typing import Tuple, Optional
from PIL import Image, ExifTags


# --- FOV from EXIF ---
def _get_exif(image_path: str) -> dict:
    img = Image.open(image_path)
    exif = {}
    if hasattr(img, "_getexif") and img._getexif():
        for k, v in img._getexif().items():
            exif[ExifTags.TAGS.get(k, k)] = v
    return exif

def estimate_hfov_deg(image_path: str) -> Optional[float]:
    """
    Try to estimate horizontal FOV from EXIF focal length & 35mm equivalent.
    If unavailable, return a reasonable default (60°) from smartphone cams.
    """
    try:
        exif = _get_exif(image_path)
        # FocalLength (num/den), FocalLengthIn35mmFilm
        fl = exif.get("FocalLength", None)
        fl35 = exif.get("FocalLengthIn35mmFilm", None)
        if isinstance(fl, tuple):
            fl = fl[0]/fl[1]
        if fl35:
            # 35mm full-frame width = 36mm
            sensor_width_mm = 36.0 * (fl/fl35) if (fl and fl35) else None
        else:
            # Assume common phone sensor width ~6.3mm if no 35mm equiv
            sensor_width_mm = 6.3

        if fl:
            hfov = 2.0 * math.degrees(math.atan((sensor_width_mm/2.0) / fl))
            return hfov
    except Exception:
        pass
    return 60.0  # default fallback

# --- Pixel bbox -> real-world size, given distance ---
def bbox_real_size(
    img_w: int, img_h: int,
    bbox_xywh_px: Tuple[float, float, float, float],
    hfov_deg: float,
    distance_m: Optional[float] = None
) -> Tuple[Optional[float], Optional[float]]:
    """
    Returns (width_m, height_m) for the bbox if distance is known.
    Uses pinhole camera model approximation (object plane ~ perpendicular).
    """
    _, _, bw_px, bh_px = bbox_xywh_px
    if not distance_m:
        return (None, None)

    # angular resolution per pixel horizontally
    hfov_rad = math.radians(hfov_deg)
    # total width in meters at given distance across full image width:
    # W_scene = 2 * d * tan(hfov/2)
    # bbox width = (bw_px / img_w) * W_scene
    scene_width_m = 2.0 * distance_m * math.tan(hfov_rad/2.0)
    bbox_w_m = (bw_px / img_w) * scene_width_m

    # Vertical FOV from aspect (assuming same pixel aspect)
    vfov_rad = 2.0 * math.atan((img_h/img_w) * math.tan(hfov_rad/2.0))
    scene_height_m = 2.0 * distance_m * math.tan(vfov_rad/2.0)
    bbox_h_m = (bh_px / img_h) * scene_height_m

    return (bbox_w_m, bbox_h_m)

# --- Pixel bbox -> real-world size, given FOV ---  
