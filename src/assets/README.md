# Assets Directory

This directory contains all the static assets for the React Native app.

## Structure

- `images/` - App images and icons
- `fonts/` - Custom fonts (if any)
- `backgrounds/` - Background images and patterns

## Background Image

The app expects a background image at `src/assets/background.jpg` for the home screen. You can add your own background image here.

## Usage

Import assets in your components like this:

```javascript
// For images
import backgroundImage from '../assets/background.jpg';

// For fonts (if using custom fonts)
// import customFont from '../assets/fonts/CustomFont.ttf';
```

## Recommended Image Specifications

- **Background Images**: 1080x1920px or higher, optimized for mobile
- **Icons**: 24x24px to 64x64px, PNG format with transparency
- **Logos**: 200x200px or higher, PNG format with transparency

## Optimization Tips

- Compress images to reduce bundle size
- Use appropriate image formats (PNG for transparency, JPG for photos)
- Consider using React Native's image optimization features
- Test on different screen densities
