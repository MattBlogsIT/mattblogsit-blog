# WebP Image Support

This blog supports WebP images with automatic fallbacks to JPEG/PNG for better performance and compatibility.

## What is WebP?

WebP is a modern image format that provides superior compression compared to JPEG and PNG:
- **25-35% smaller** file sizes with same visual quality
- Supports both lossy and lossless compression
- **95%+ browser support** (Chrome, Firefox, Edge, Safari 14+)

## How It Works

### Automatic Generation (New Posts)

When you create a blog post via GitHub issues, the workflow automatically:
1. Downloads images from the issue
2. Optimizes JPEG/PNG images
3. **Generates WebP versions** of all images
4. Commits both versions to the repository

**No manual intervention needed!**

### For Existing Images

Run the batch conversion script:

```bash
./scripts/generate-webp.sh
```

This will:
- Scan `assets/img/` for JPEG and PNG files
- Generate WebP versions (filename.webp)
- **Keep original files** as fallbacks
- Show savings report

## Using WebP Images in Posts

### Option 1: WebP Include (Recommended)

Use the `webp-image.html` include for automatic WebP with fallback:

```liquid
{% include webp-image.html
   src="/assets/img/photo.jpg"
   alt="Description of image"
   class="aligncenter"
   caption="Optional caption text" %}
```

**What it generates:**
```html
<picture>
  <source srcset="/assets/img/photo.webp" type="image/webp">
  <img src="/assets/img/photo.jpg" alt="Description" loading="lazy" decoding="async">
</picture>
```

### Option 2: Manual Picture Element

For full control, use HTML picture element:

```html
<picture>
  <source srcset="{{ site.baseurl }}/assets/img/photo.webp" type="image/webp">
  <img src="{{ site.baseurl }}/assets/img/photo.jpg"
       alt="Description"
       loading="lazy"
       decoding="async">
</picture>
```

### With Captions

```liquid
{% include webp-image.html
   src="/assets/img/photo.jpg"
   alt="Mountain landscape"
   class="aligncenter"
   caption="Beautiful mountain view at sunset" %}
```

**Generates:**
```html
<figure class="aligncenter">
  <picture>
    <source srcset="/assets/img/photo.webp" type="image/webp">
    <img src="/assets/img/photo.jpg" alt="Mountain landscape" loading="lazy">
  </picture>
  <figcaption>Beautiful mountain view at sunset</figcaption>
</figure>
```

## Include Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `src` | Yes | Path to original image (JPEG/PNG) |
| `alt` | No | Alt text for accessibility |
| `class` | No | CSS class (e.g., `aligncenter`, `alignleft`) |
| `caption` | No | Caption text (wraps in `<figure>`) |

## Browser Support

| Browser | WebP Support |
|---------|--------------|
| Chrome | ✅ All versions |
| Firefox | ✅ 65+ |
| Edge | ✅ All versions |
| Safari | ✅ 14+ (iOS 14+) |
| Opera | ✅ 32+ |

**Fallback:** Older browsers automatically use JPEG/PNG from the `<img>` tag.

## Performance Impact

### Before WebP
- JPEG: 500KB
- PNG: 800KB

### After WebP
- WebP: 350KB (30% smaller than JPEG)
- WebP: 550KB (31% smaller than PNG)

**Page load improvements:**
- 20-40% faster LCP (Largest Contentful Paint)
- Reduced bandwidth usage
- Better Core Web Vitals scores

## File Organization

```
assets/img/
├── photo.jpg      # Original (fallback)
├── photo.webp     # WebP version (served first)
├── banner.png     # Original (fallback)
└── banner.webp    # WebP version (served first)
```

## Workflow Integration

The issue-to-post workflow (`.github/workflows/issue-to-post.yml`) automatically:

1. **Downloads** images from GitHub issues
2. **Optimizes** JPEG/PNG (resize, compress, strip metadata)
3. **Generates** WebP versions with `cwebp -q 85`
4. **Commits** both original and WebP versions

## Quality Settings

- **WebP Quality:** 85 (balances size and quality)
- **JPEG Quality:** 85 (for fallback)
- **Max Dimensions:** 1920x1920px

## Testing

### Verify WebP Support
1. Open blog post in Chrome DevTools
2. Network tab → Filter by "Img"
3. Look for `.webp` files being loaded
4. Check fallback in Safari 13 or older browsers

### Performance Testing
```bash
# Compare file sizes
ls -lh assets/img/photo.jpg
ls -lh assets/img/photo.webp

# Test with PageSpeed Insights
https://pagespeed.web.dev/
```

## Migration Guide

### For Existing Posts

1. **Generate WebP versions:**
   ```bash
   ./scripts/generate-webp.sh
   ```

2. **Update post images** (optional - for best results):
   - Replace `<img>` tags with `{% include webp-image.html %}`
   - Or use `<picture>` elements manually

3. **Verify:**
   - Check both .jpg and .webp files exist
   - Test in browser with DevTools

### For New Posts

✅ **No action needed!** The workflow handles everything automatically.

## Troubleshooting

### WebP Not Loading
- Check both .jpg and .webp files exist in `assets/img/`
- Verify `<source>` comes before `<img>` in picture element
- Check browser supports WebP (95%+ do)

### File Size Too Large
- Adjust quality in workflow (currently 85)
- Resize images to max 1920px
- Consider converting PNG to JPEG first

### Generation Script Fails
```bash
# Install WebP tools
brew install webp          # macOS
sudo apt-get install webp  # Linux
```

## Best Practices

1. ✅ Always include original JPEG/PNG as fallback
2. ✅ Use `webp-image.html` include for consistency
3. ✅ Add descriptive alt text for accessibility
4. ✅ Test in multiple browsers
5. ✅ Run `generate-webp.sh` after bulk image adds

## Resources

- [WebP Documentation](https://developers.google.com/speed/webp)
- [Can I Use WebP](https://caniuse.com/webp)
- [WebP Converter](https://squoosh.app/)
- [cwebp Tool](https://developers.google.com/speed/webp/docs/cwebp)
