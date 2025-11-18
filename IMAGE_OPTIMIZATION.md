# Image Optimization Guide

## Overview

This guide covers the image optimization workflow for Matt Blogs IT, including automated checks, manual optimization, and best practices.

## Quick Start

### One-Time Setup

```bash
# 1. Setup git hooks for automatic validation
./scripts/setup-git-hooks.sh

# 2. Install optimization tools (choose your platform)

# macOS
brew install imagemagick optipng jpegoptim webp

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y imagemagick optipng jpegoptim webp

# Fedora/RHEL
sudo dnf install imagemagick optipng jpegoptim libwebp-tools
```

### Optimize Existing Images

```bash
# Run the batch optimization script
./scripts/optimize-images.sh

# This will:
# - Create a backup of original images
# - Compress all JPEGs and PNGs
# - Convert large images to WebP format
# - Generate a detailed report
```

## Size Limits

| Threshold | Action | Status |
|-----------|--------|--------|
| **>500KB** | ❌ Commit blocked by pre-commit hook | FAIL |
| **300-500KB** | ⚠️ Warning issued, optimization recommended | WARN |
| **<300KB** | ✅ Optimized | PASS |

## Automated Workflows

### 1. Pre-Commit Hook (Local)

**When:** Before every commit
**What:** Validates staged image files
**Location:** `.githooks/pre-commit`

**Behavior:**
- Scans all staged images (JPG, PNG, GIF)
- Blocks commits with images >500KB
- Warns about images 300-500KB
- Provides optimization commands

**Setup:**
```bash
./scripts/setup-git-hooks.sh
```

**Bypass (NOT recommended):**
```bash
git commit --no-verify
```

### 2. GitHub Actions (Pull Requests)

**When:** On PR with image changes
**What:** Validates all changed images
**Location:** `.github/workflows/image-optimization-check.yml`

**Features:**
- Comments on PR with detailed report
- Shows file sizes and dimensions
- Provides specific optimization commands
- Sets commit status (pass/fail)

**Example PR Comment:**
```markdown
## 🖼️ Image Optimization Report

### ❌ `large-screenshot.png` - **1200KB** (exceeds 500KB limit)

**Dimensions:** 2400x1600

**Suggested fix:**
```bash
mogrify -resize '1200>' assets/img/large-screenshot.png
optipng -o2 assets/img/large-screenshot.png
cwebp -q 85 assets/img/large-screenshot.png -o assets/img/large-screenshot.webp
```

## Manual Optimization

### JPEG Images

```bash
# Method 1: ImageMagick (quality + resize)
mogrify -quality 85 -resize '1200>' assets/img/photo.jpg

# Method 2: jpegoptim (lossless + strip metadata)
jpegoptim --max=85 --strip-all assets/img/photo.jpg

# Create WebP version (smaller file size)
cwebp -q 85 assets/img/photo.jpg -o assets/img/photo.webp
```

**Quality Settings:**
- 85% - Excellent quality, good compression (recommended)
- 75% - Good quality, better compression
- 60% - Acceptable quality, high compression

### PNG Images

```bash
# Method 1: ImageMagick (resize)
mogrify -resize '1200>' assets/img/screenshot.png

# Method 2: OptiPNG (lossless compression)
optipng -o2 assets/img/screenshot.png

# Create WebP version
cwebp -q 85 assets/img/screenshot.png -o assets/img/screenshot.webp
```

**OptiPNG Levels:**
- `-o2` - Fast, moderate compression (recommended)
- `-o5` - Slower, better compression
- `-o7` - Very slow, maximum compression

### GIF Images

```bash
# Check size
ls -lh assets/img/animation.gif

# For large GIFs (>500KB):
# 1. Use online tool: https://ezgif.com/optimize
# 2. Convert to video (better compression):
ffmpeg -i assets/img/animation.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" assets/img/animation.mp4
```

## Best Practices

### Before Adding Images

1. **Resize to appropriate dimensions**
   - Blog content: 800-1200px wide
   - Hero images: 1200-1600px wide
   - Thumbnails: 300-400px wide

2. **Choose the right format**
   - **JPEG**: Photos, images with gradients
   - **PNG**: Screenshots, images with text/transparency
   - **WebP**: Modern browsers (use with fallback)
   - **SVG**: Icons, logos, simple graphics
   - **GIF**: Only for short animations (<500KB)

3. **Optimize before committing**
   ```bash
   # Quick check of file size
   ls -lh assets/img/new-image.jpg

   # If >500KB, optimize
   ./scripts/optimize-images.sh
   ```

### Using WebP with Fallbacks

```html
<!-- HTML picture element for WebP with fallback -->
<picture>
  <source srcset="{{ site.baseurl }}/assets/img/photo.webp" type="image/webp">
  <img src="{{ site.baseurl }}/assets/img/photo.jpg" alt="Description">
</picture>
```

### Lazy Loading

```html
<!-- Add loading="lazy" for below-the-fold images -->
<img src="{{ site.baseurl }}/assets/img/photo.jpg"
     alt="Description"
     loading="lazy"
     decoding="async">
```

## Troubleshooting

### Pre-commit Hook Not Running

```bash
# Check git hooks configuration
git config core.hooksPath

# Should output: .githooks

# If not set, run setup again
./scripts/setup-git-hooks.sh
```

### Missing Optimization Tools

```bash
# Check which tools are installed
command -v convert && echo "✓ ImageMagick"
command -v optipng && echo "✓ OptiPNG"
command -v jpegoptim && echo "✓ jpegoptim"
command -v cwebp && echo "✓ WebP"

# Install missing tools (macOS)
brew install imagemagick optipng jpegoptim webp

# Install missing tools (Ubuntu/Debian)
sudo apt-get install imagemagick optipng jpegoptim webp
```

### Optimization Script Errors

```bash
# Check script is executable
ls -la scripts/optimize-images.sh

# Should show: -rwxr-xr-x

# If not executable
chmod +x scripts/optimize-images.sh

# Run with bash explicitly
bash scripts/optimize-images.sh
```

### Restore from Backup

```bash
# List available backups
ls -la _backup/

# Restore specific image from backup
cp _backup/images_20250118_143022/assets/img/photo.jpg assets/img/

# Restore all images from specific backup
cp -r _backup/images_20250118_143022/assets/img/* assets/img/
```

## Advanced Techniques

### Batch Processing Specific Directory

```bash
# Optimize only images in specific subdirectory
find assets/img/2024 -name "*.jpg" -exec mogrify -quality 85 {} \;
```

### Create Responsive Images

```bash
# Create multiple sizes for responsive design
for img in assets/img/original/*.jpg; do
  filename=$(basename "$img" .jpg)

  # Large (1200px)
  convert "$img" -resize 1200x assets/img/${filename}-1200.jpg

  # Medium (800px)
  convert "$img" -resize 800x assets/img/${filename}-800.jpg

  # Small (400px)
  convert "$img" -resize 400x assets/img/${filename}-400.jpg
done
```

### Batch WebP Conversion

```bash
# Convert all JPEGs to WebP
find assets/img -name "*.jpg" -exec sh -c 'cwebp -q 85 "$1" -o "${1%.jpg}.webp"' _ {} \;

# Convert all PNGs to WebP
find assets/img -name "*.png" -exec sh -c 'cwebp -q 85 "$1" -o "${1%.png}.webp"' _ {} \;
```

## Performance Monitoring

### Check Current Image Sizes

```bash
# Total size of all images
du -sh assets/img

# List largest images
find assets/img -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.gif" \) -exec ls -lh {} \; | awk '{print $5, $9}' | sort -h -r | head -20

# Count images over 500KB
find assets/img -type f -size +500k | wc -l
```

### Lighthouse Performance

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit on production site
lighthouse https://mattblogsit.com --view

# Check specific metrics
lighthouse https://mattblogsit.com --only-categories=performance --output=json
```

## CI/CD Integration

### GitHub Actions Status Checks

The image optimization workflow runs automatically on PRs:

1. **Detects changed images** in `assets/img/`
2. **Validates sizes** against thresholds
3. **Comments on PR** with detailed report
4. **Sets commit status**:
   - ✅ Success: All images <500KB
   - ❌ Failure: Images >500KB detected

### Branch Protection Rules

Consider adding image optimization check as required status:

1. Go to **Settings** → **Branches**
2. Edit protection rules for `main`
3. Add `ci/image-optimization` to required checks

## Resources

### Tools
- [ImageMagick](https://imagemagick.org/) - Image manipulation
- [OptiPNG](http://optipng.sourceforge.net/) - PNG optimization
- [jpegoptim](https://github.com/tjko/jpegoptim) - JPEG optimization
- [WebP Tools](https://developers.google.com/speed/webp) - WebP conversion

### Online Optimizers
- [TinyPNG](https://tinypng.com/) - Smart PNG/JPEG compression
- [Squoosh](https://squoosh.app/) - Modern image optimizer
- [EZGIF](https://ezgif.com/optimize) - GIF optimizer

### Testing
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://github.com/GoogleChrome/lighthouse)

## Questions?

For issues or suggestions, please:
1. Check the troubleshooting section above
2. Review existing GitHub issues
3. Create a new issue with the `image-optimization` label
