---
name: Create Blog Logo and Open Graph Images
about: Design and create logo and default OG image for social sharing
title: 'Design: Create blog logo and default Open Graph image'
labels: design, enhancement, SEO
assignees: ''
---

## Overview
Create branding assets for Matt Blogs IT to improve social sharing and SEO.

## Assets Needed

### 1. Site Logo (Square)
**Purpose:** Used in structured data (Schema.org) and potentially in header/footer

**Requirements:**
- **Size:** 512x512px (square)
- **Format:** PNG with transparent background
- **Content:** "Matt Blogs IT" branding or initials (MG)
- **File path:** `/assets/img/logo.png`

**Design suggestions:**
- Simple, recognizable icon
- Works well at small sizes
- Represents IT/tech/cloud theme
- Professional appearance

### 2. Default Open Graph Image
**Purpose:** Social sharing preview when posts don't have featured images

**Requirements:**
- **Size:** 1200x630px (Facebook/LinkedIn standard)
- **Format:** PNG or JPG
- **Content:**
  - "Matt Blogs IT" branding
  - Tagline: "IT, Cloud, and Cybersecurity Insights"
  - Tech-themed background or graphics
- **File path:** `/assets/img/og-default.png`

**Design suggestions:**
- Bold, readable text (shows in small previews)
- On-brand colors
- Tech/cloud theme (servers, network, security icons)
- Clean, professional layout

## Implementation Steps

1. **Design assets** using Canva, Figma, or similar tool
2. **Optimize images:**
   ```bash
   # Ensure images are optimized
   ./scripts/optimize-images.sh
   ```
3. **Add to repository:**
   - Save as `/assets/img/logo.png`
   - Save as `/assets/img/og-default.png`
4. **Update `_config.yml`:**
   ```yaml
   # SEO settings
   logo: /assets/img/logo.png
   image: /assets/img/og-default.png
   ```
5. **Test social sharing:**
   - Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Current Workaround

The issue-to-post workflow now automatically sets the **first image** in blog posts as the featured image for Open Graph. This means:
- ✅ New posts with images will have proper OG images
- ❌ Posts without images and site pages still need fallback

## Resources

- [Open Graph Image Best Practices](https://www.opengraph.xyz/)
- [Canva OG Image Template](https://www.canva.com/create/facebook-posts/)
- [Free Icon Resources](https://www.flaticon.com/) (for tech icons)

## Acceptance Criteria

- [ ] Logo created (512x512px PNG)
- [ ] OG default image created (1200x630px)
- [ ] Both images optimized (<100KB each)
- [ ] Files added to `/assets/img/`
- [ ] `_config.yml` updated
- [ ] Tested with Facebook/LinkedIn sharing debuggers
- [ ] Images display correctly in social previews
