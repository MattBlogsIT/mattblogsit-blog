# Local Development Guide - Matt Blogs IT

This guide provides comprehensive instructions for running the Jekyll-based GitHub Pages website locally on your workstation with full navigation and functionality.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Running the Local Server](#running-the-local-server)
- [Verification Checklist](#verification-checklist)
- [Testing Scenarios](#testing-scenarios)
- [Troubleshooting](#troubleshooting)
- [Environment Differences](#environment-differences)

---

## Prerequisites

### Required Software
1. **Ruby** (version 3.1+)
   - macOS: `brew install ruby`
   - Linux: `sudo apt-get install ruby-full build-essential zlib1g-dev`
   - Verify: `ruby --version`

2. **Bundler** (version 2.3+)
   - Install: `gem install bundler`
   - Verify: `bundle --version`

3. **Git** (for version control)
   - macOS: Pre-installed or `brew install git`
   - Linux: `sudo apt-get install git`
   - Verify: `git --version`

### System Configuration
**macOS Users:** Add this to your `~/.zshrc` or `~/.bash_profile`:
```bash
# Ruby gems path for homebrew
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
export PATH="/opt/homebrew/lib/ruby/gems/3.4.0/bin:$PATH"
```

**Linux Users:** Add this to your `~/.bashrc`:
```bash
# Ruby gems path
export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"
```

---

## Initial Setup

### 1. Clone the Repository
```bash
# Clone the repository
git clone https://github.com/MattBlogsIT/mattblogsit-blog.git
cd mattblogsit-blog

# Verify you're on the correct branch
git status
```

### 2. Install Dependencies
```bash
# Install all Jekyll dependencies
bundle install

# If you encounter permission errors on macOS, use:
/opt/homebrew/lib/ruby/gems/3.4.0/bin/bundle install

# Expected output: "Bundle complete!"
```

**Note:** The first `bundle install` may take 2-5 minutes as it downloads and compiles native extensions for Jekyll and dependencies.

### 3. Verify Configuration
The site is pre-configured for local development:
- `baseurl: ""` in `_config.yml` (empty for custom domain)
- `url: "https://mattblogsit.com"` (production URL)
- All templates use `{{ site.baseurl }}` for proper path resolution

**You don't need to modify any configuration files for local development.**

---

## Running the Local Server

### Quick Start (Recommended)
```bash
# Standard development server
bundle exec jekyll serve --baseurl ""

# Alternative using full path (if bundle not in PATH)
/opt/homebrew/lib/ruby/gems/3.4.0/bin/bundle exec jekyll serve --baseurl ""
```

**Server will be available at:** `http://127.0.0.1:4000/`

**Important:**
- Use `127.0.0.1:4000` NOT `localhost:4000` (avoids IPv6 issues)
- Press `Ctrl+C` to stop the server
- Site auto-regenerates when files change (except `_config.yml`)
- If you modify `_config.yml`, restart the server

### Advanced Options

#### Development with Drafts
```bash
# Include draft posts from _drafts/ folder
bundle exec jekyll serve --baseurl "" --drafts
```

#### Production Build Testing
```bash
# Build with production environment (minification, analytics, etc.)
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""

# Serve the production build
bundle exec jekyll serve --skip-initial-build --no-watch
```

#### Live Reload (Auto-refresh Browser)
```bash
# Install livereload gem first
gem install jekyll-livereload

# Serve with livereload
bundle exec jekyll serve --baseurl "" --livereload
```

#### Incremental Builds (Faster Regeneration)
```bash
# Only rebuild changed files
bundle exec jekyll serve --baseurl "" --incremental
```

---

## Verification Checklist

After starting the local server, verify all functionality works correctly:

### ✅ Navigation Testing
1. **Homepage** (`http://127.0.0.1:4000/`)
   - [ ] Site logo loads and links to homepage
   - [ ] Main navigation menu displays all pages
   - [ ] Recent posts appear in the main content area
   - [ ] Sidebar shows categories and archives

2. **Navigation Links** (test each):
   - [ ] Home (`/`)
   - [ ] About Me (`/about/`)
   - [ ] Contact (`/contact/`)
   - [ ] Archive (`/archive/`)
   - [ ] Category (`/category/`)
   - [ ] Posts (`/posts/`)

3. **Mobile Navigation**
   - [ ] Resize browser to mobile width (<1024px)
   - [ ] Hamburger menu button appears
   - [ ] Click hamburger to open mobile menu
   - [ ] All navigation links work in mobile menu
   - [ ] Categories and archives display correctly
   - [ ] Close mobile menu by clicking overlay

### ✅ Asset Loading
1. **Stylesheets**
   - [ ] `/assets/css/main.css` loads (check DevTools Network tab)
   - [ ] `/assets/css/analytics.css` loads
   - [ ] Light theme displays correctly by default
   - [ ] No CSS 404 errors in console

2. **JavaScript**
   - [ ] Theme switcher button appears (top-right)
   - [ ] Search functionality works (desktop and mobile)
   - [ ] Hamburger menu works (mobile)
   - [ ] No JavaScript errors in console (F12 > Console)

3. **Images**
   - [ ] Site logo displays (`/assets/img/logo.webp`)
   - [ ] Blog post images load correctly
   - [ ] Image modal works (click any post image)
   - [ ] No image 404 errors in Network tab

### ✅ Functionality Testing
1. **Theme Switcher**
   - [ ] Click theme toggle button (top-right)
   - [ ] Page switches between light and dark mode
   - [ ] Theme preference persists on page refresh
   - [ ] All colors update correctly

2. **Search**
   - [ ] Click search icon (desktop top-right, mobile hamburger menu)
   - [ ] Type a search query (e.g., "cloud")
   - [ ] Results appear and filter in real-time
   - [ ] Click result to navigate to post

3. **Blog Post Pages**
   - [ ] Open any blog post
   - [ ] Breadcrumbs display correctly
   - [ ] Reading time shows accurate estimate
   - [ ] Code syntax highlighting works
   - [ ] Related posts appear at bottom
   - [ ] Pagination works on `/posts/` page

4. **Categories and Archives**
   - [ ] Visit `/category/` page
   - [ ] All categories display with post counts
   - [ ] Click a category to filter posts
   - [ ] Visit `/archive/` page
   - [ ] Posts grouped by year correctly

### ✅ Responsive Design
1. **Desktop (>1024px)**
   - [ ] Full navigation bar visible
   - [ ] Sidebar shows on right side
   - [ ] Images display full width or centered
   - [ ] No horizontal scrolling

2. **Tablet/Mobile (≤1024px)**
   - [ ] Navigation collapses to hamburger menu
   - [ ] Sidebar moves below main content
   - [ ] All buttons have adequate touch targets (44px min)
   - [ ] Text remains readable (no overflow)
   - [ ] Images scale responsively

### ✅ Performance Checks
Open DevTools (F12) > Lighthouse tab > Run audit:
- [ ] Performance score >90
- [ ] Accessibility score >95
- [ ] Best Practices score >90
- [ ] SEO score >90

---

## Testing Scenarios

### Scenario 1: Testing a New Blog Post
```bash
# 1. Create a test post
cat > _posts/2025-12-23-test-post.md << 'EOF'
---
title: "Test Post"
date: 2025-12-23
categories:
- "Administrator"
excerpt: "This is a test post for local development"
---

# Test Content

This is a test post to verify local development works correctly.

![Test Image]({{ site.baseurl }}/assets/img/logo.webp)
EOF

# 2. Server auto-regenerates (if running with --watch)
# 3. Visit http://127.0.0.1:4000/posts/ to see new post
# 4. Delete test post when done
```

### Scenario 2: Testing CSS Changes
```bash
# 1. Make changes to assets/css/main.css
# 2. Server auto-regenerates
# 3. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
# 4. Verify changes appear correctly
# 5. Test both light and dark themes
```

### Scenario 3: Testing Production Build
```bash
# 1. Build production version
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""

# 2. Check for errors in output
# 3. Verify _site/ folder contains all expected files

# 4. Check for broken links (optional)
bundle exec htmlproofer ./_site --disable-external --allow-hash-href

# 5. Serve production build
bundle exec jekyll serve --skip-initial-build --no-watch

# 6. Visit http://127.0.0.1:4000/ and test
```

---

## Troubleshooting

### Server Won't Start

**Error: `bundler: command not found: jekyll`**
```bash
# Solution: Install dependencies
bundle install

# If that fails, try updating bundler
gem install bundler
bundle install
```

**Error: `Address already in use - bind(2)`**
```bash
# Solution: Kill existing Jekyll process
pkill -f jekyll

# Or find and kill the specific process
lsof -ti:4000 | xargs kill -9

# Then restart server
bundle exec jekyll serve --baseurl ""
```

**Error: `cannot load such file -- webrick`**
```bash
# Solution: Add webrick gem (Ruby 3.0+)
bundle add webrick
bundle install
```

### Pages Not Loading (404 Errors)

**Homepage works but other pages show 404:**
1. Check that you're using the correct URL format:
   - ✅ Correct: `http://127.0.0.1:4000/about/`
   - ❌ Wrong: `http://localhost:4000/about` (missing trailing slash)

2. Verify baseurl is empty:
   ```bash
   grep "baseurl:" _config.yml
   # Should show: baseurl: ""
   ```

3. Restart server after config changes:
   ```bash
   # Press Ctrl+C to stop
   bundle exec jekyll serve --baseurl ""
   ```

### Assets Not Loading (CSS/JS/Images)

**CSS not loading (page has no styling):**
1. Check browser DevTools (F12 > Network tab)
2. Look for 404 errors on CSS files
3. Verify file paths in `_layouts/default.html`:
   ```liquid
   {{ site.baseurl }}/assets/css/main.css
   ```
4. Ensure `baseurl: ""` in `_config.yml`
5. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

**Images not loading:**
1. Check image paths use `{{ site.baseurl }}` prefix
2. Verify images exist in `assets/img/` folder
3. Check file extensions match (case-sensitive on Linux)
4. Look for errors in browser console (F12)

### Changes Not Reflecting

**Modified files but changes don't appear:**
1. Hard refresh browser to clear cache (Cmd+Shift+R)
2. Check terminal for regeneration messages:
   ```
   Regenerating: 1 file(s) changed at 2025-12-23 10:30:00
                 _posts/2025-12-23-example.md
                 ...done in 0.5 seconds.
   ```
3. If no regeneration, restart server
4. For `_config.yml` changes, **always** restart server

**CSS changes not applying:**
```bash
# 1. Stop server (Ctrl+C)
# 2. Clear Jekyll cache
rm -rf .jekyll-cache _site

# 3. Restart server
bundle exec jekyll serve --baseurl ""

# 4. Hard refresh browser
```

### Performance Issues

**Slow regeneration times:**
```bash
# Use incremental builds
bundle exec jekyll serve --baseurl "" --incremental

# Or disable watch for faster builds
bundle exec jekyll build --baseurl ""
```

**High CPU usage:**
- Disable file watching if not needed: `--no-watch`
- Use `--incremental` flag
- Exclude large folders in `_config.yml`

### Ruby/Bundler Issues

**Wrong Ruby version:**
```bash
# Check current version
ruby --version

# Install correct version (macOS)
brew install ruby@3.1

# Install correct version (Linux - using rbenv)
rbenv install 3.1.7
rbenv local 3.1.7
```

**Bundler version conflicts:**
```bash
# Update bundler
gem install bundler

# Or use specific version
gem install bundler -v 2.6.0

# Regenerate Gemfile.lock
rm Gemfile.lock
bundle install
```

**Permission errors (macOS):**
```bash
# Use homebrew Ruby instead of system Ruby
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"

# Or install gems to user directory
bundle install --path vendor/bundle
```

---

## Environment Differences

### Development vs Production

| Feature | Development (`jekyll serve`) | Production (`JEKYLL_ENV=production`) |
|---------|------------------------------|--------------------------------------|
| **Analytics** | Disabled (no tracking) | Enabled (Google Analytics) |
| **Minification** | None (readable source) | CSS/JS minified |
| **Caching** | Disabled | Enabled |
| **Drafts** | Optional (`--drafts` flag) | Excluded |
| **Source Maps** | Generated | Removed |
| **Build Time** | ~2-5 seconds | ~10-15 seconds |

### Local vs GitHub Pages

| Aspect | Local Development | GitHub Pages (Live) |
|--------|-------------------|---------------------|
| **URL** | `http://127.0.0.1:4000/` | `https://mattblogsit.com` |
| **Baseurl** | `""` (empty) | `""` (empty - custom domain) |
| **SSL** | None (HTTP only) | Automatic (HTTPS) |
| **Build Trigger** | File changes | Git push to `main` |
| **Build Time** | Instant | 1-3 minutes |
| **Jekyll Version** | 3.10.0 (matches Pages) | 3.10.0 (locked by GitHub) |
| **Plugins** | Any gems installed | GitHub Pages safe only |
| **Ruby Version** | Your local version | GitHub's Ruby version |

### Baseurl Behavior

**Why `--baseurl ""`?**

The site is configured for a **custom domain** (`mattblogsit.com`), not a project page (`username.github.io/repo`):

- **Custom domain sites:** Use `baseurl: ""`
- **Project sites:** Use `baseurl: "/repo-name"`

Since `_config.yml` already has `baseurl: ""`, the `--baseurl ""` flag is technically redundant but ensures consistency across environments.

**What if I don't use `--baseurl ""`?**

Nothing breaks! The flag is optional because:
1. `_config.yml` already sets `baseurl: ""`
2. All templates properly use `{{ site.baseurl }}`
3. Local server runs on root path by default

---

## Quick Reference Commands

```bash
# Standard development server
bundle exec jekyll serve --baseurl ""

# With drafts
bundle exec jekyll serve --baseurl "" --drafts

# Production build
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""

# Incremental builds (faster)
bundle exec jekyll serve --baseurl "" --incremental

# Live reload (auto-refresh browser)
bundle exec jekyll serve --baseurl "" --livereload

# Stop server
# Press Ctrl+C in terminal

# Kill stuck server
pkill -f jekyll

# Clear cache and rebuild
rm -rf .jekyll-cache _site
bundle exec jekyll serve --baseurl ""

# Check for broken links
bundle exec htmlproofer ./_site --disable-external
```

---

## Pre-PR Testing Checklist

Before creating a pull request, **always** test locally:

```bash
# 1. Test development build
bundle exec jekyll serve --baseurl ""
# Visit http://127.0.0.1:4000/ and verify changes

# 2. Test production build
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
# Check for build errors

# 3. Verify responsive design
# Resize browser: Desktop (>1024px) and Mobile (≤1024px)

# 4. Test both themes
# Click theme toggle and verify all components work

# 5. Check browser console
# F12 > Console - should have no errors

# 6. Verify all navigation
# Test all menu links, categories, archives

# 7. Stop server
# Ctrl+C
```

**If all checks pass:** Ready to create PR!

**If issues found:** Fix locally and re-test before pushing.

---

## Additional Resources

- **Jekyll Documentation:** https://jekyllrb.com/docs/
- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Liquid Templating:** https://shopify.github.io/liquid/
- **Jekyll Themes:** https://jekyllrb.com/docs/themes/
- **Troubleshooting Guide:** https://jekyllrb.com/docs/troubleshooting/

---

## Need Help?

1. **Check server output:** Terminal shows detailed error messages
2. **Check browser console:** F12 > Console for JavaScript errors
3. **Check Network tab:** F12 > Network for 404 errors
4. **Search Jekyll docs:** Most issues documented at jekyllrb.com
5. **Review CLAUDE.md:** Project-specific guidelines and standards

---

**Last Updated:** 2025-12-23
**Jekyll Version:** 3.10.0 (GitHub Pages compatible)
**Ruby Version:** 3.1+ recommended
**Bundler Version:** 2.3+ recommended
