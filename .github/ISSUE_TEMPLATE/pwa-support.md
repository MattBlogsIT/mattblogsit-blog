---
name: Implement Progressive Web App (PWA) Features
about: Add service worker and PWA capabilities for offline support
title: 'Performance: Add PWA support with service worker'
labels: enhancement, performance, PWA
assignees: ''
---

## Overview
Implement Progressive Web App features including offline support, caching, and app-like experience.

## Current State
- No service worker
- No offline functionality
- Not installable as app
- No caching strategy

## Proposed Solution

### 1. Create Web App Manifest
Location: `/manifest.json`

```json
{
  "name": "Matt Blogs IT",
  "short_name": "MattBlogsIT",
  "description": "IT, Cloud, and Cybersecurity Insights",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#007bff",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/assets/img/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/img/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Create Service Worker
Location: `/service-worker.js`

**Caching Strategy:**
- **Cache First**: CSS, JS, fonts, images
- **Network First**: HTML pages, blog posts
- **Stale While Revalidate**: API calls, analytics

**Features:**
- Offline page fallback
- Static asset caching
- Dynamic content caching
- Cache versioning and cleanup

### 3. Register Service Worker
Add to `_layouts/default.html`:

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
```

## PWA Features

### Offline Support
- Cache essential pages (home, about, recent posts)
- Show custom offline page when network unavailable
- Background sync for analytics

### App-Like Experience
- Installable to home screen
- Full-screen mode
- Splash screen
- App icons

### Performance
- Faster subsequent loads (cached assets)
- Reduced bandwidth usage
- Better mobile experience

## Benefits
- Works offline or on poor connections
- Installable as mobile/desktop app
- 50%+ faster repeat visits
- Better user engagement
- Improved Lighthouse PWA score

## Implementation Tasks

- [ ] Create `/manifest.json` with app metadata
- [ ] Generate app icons (192x192, 512x512)
- [ ] Create `/service-worker.js` with caching logic
- [ ] Add manifest link to `_layouts/default.html`
- [ ] Register service worker in default layout
- [ ] Create offline fallback page
- [ ] Test installation on mobile devices
- [ ] Test offline functionality
- [ ] Validate with Lighthouse PWA audit

## Testing Checklist
- [ ] PWA installable on Chrome/Edge/Safari
- [ ] Offline page displays correctly
- [ ] Cached pages load without network
- [ ] Service worker updates properly
- [ ] Lighthouse PWA score 90+
- [ ] App icons display correctly
- [ ] Works on iOS and Android

## Resources
- [Google PWA Guide](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Workbox (Google's SW library)](https://developers.google.com/web/tools/workbox)

## Notes
- Service workers only work over HTTPS (GitHub Pages ✅)
- Consider using Workbox for easier service worker management
- Test thoroughly before deployment (service workers can be tricky to debug)
