---
name: Add WebP Image Support with Fallbacks
about: Convert images to WebP format for better compression
title: 'Performance: Add WebP image support with JPEG/PNG fallbacks'
labels: enhancement, performance
assignees: ''
---

## Overview
Implement WebP image format support to reduce image file sizes by 25-35% while maintaining visual quality.

## Current State
- Images are optimized as JPEG/PNG only
- Workflow converts oversized PNGs to JPEG
- No WebP conversion in place

## Proposed Solution

### Update Issue-to-Post Workflow
Add WebP conversion step after current image optimization:

```bash
# For each optimized image
convert image.jpg -quality 85 image.webp

# Generate HTML picture element
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```

### Update Existing Images
Create script to batch convert existing images:
- Generate WebP versions alongside originals
- Update blog posts to use `<picture>` elements
- Maintain JPEG/PNG fallbacks for older browsers

## Benefits
- 25-35% smaller file sizes
- Faster page loads
- Better Core Web Vitals scores
- Maintains compatibility with fallbacks

## Implementation Tasks

- [ ] Update `.github/workflows/issue-to-post.yml` to generate WebP
- [ ] Create batch conversion script for existing images
- [ ] Update image include template to use `<picture>` elements
- [ ] Test browser compatibility (WebP support is 95%+ now)
- [ ] Update IMAGE_OPTIMIZATION.md documentation

## Browser Support
- ✅ Chrome/Edge (all versions)
- ✅ Firefox 65+
- ✅ Safari 14+ (iOS 14+)
- ✅ Opera 32+
- Fallback for older browsers

## Testing Checklist
- [ ] WebP images generate correctly
- [ ] Fallback images load in older browsers
- [ ] File sizes reduced by 25%+
- [ ] No visual quality degradation
- [ ] Lazy loading still works
