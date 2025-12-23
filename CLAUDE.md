# Claude AI Assistant Instructions - Matt Blogs IT

## Project Overview
This is a personal blog focused on IT, Cloud, and Cybersecurity topics built with Jekyll and hosted on GitHub Pages. The blog aims to share technical knowledge, tutorials, and insights about technology infrastructure, automation, and security.

## Key Technical Details
- **Framework**: Jekyll 3.10.0 (GitHub Pages compatible)
- **Hosting**: GitHub Pages (https://mattblogsit.com)
- **Theme**: Custom accessible theme with light/dark mode support
- **Languages**: HTML, CSS, JavaScript, Liquid templating
- **Plugins**: jekyll-feed, jekyll-sitemap (must be GitHub Pages safe)

## Blog Focus Areas
1. **Cloud Computing**: AWS, Azure, GCP implementations and best practices
2. **Cybersecurity**: Defensive security, compliance, threat analysis
3. **Infrastructure**: Networking, monitoring, automation
4. **Development**: PowerShell, APIs, scripting, automation tools
5. **Personal**: Adaptive sports, accessibility technology

## Important Guidelines

### Content Creation
- Focus on defensive security only - no offensive security content
- Emphasize practical, real-world IT solutions
- Include code examples with proper syntax highlighting
- Add estimated reading times for longer articles
- Use categories for organization (not tags)
- Follow title case for category names with proper YAML quoting

### Technical Standards
- **Accessibility**: Maintain WCAG 2.1 AA compliance (images require alt attributes)
- **Performance**: Optimize for Core Web Vitals (LCP, CLS, FID)
  - **NEW**: CSS files >100KB trigger warnings
  - **CRITICAL**: Images >500KB are **BLOCKED** by pre-commit hook
  - **Automated**: GitHub Actions validates all PR images
  - See [IMAGE_OPTIMIZATION.md](IMAGE_OPTIMIZATION.md) for full workflow
- **SEO**: Include meta descriptions, structured data, proper headings
- **Security**: Sanitize code examples, use HTTPS, follow responsible disclosure
  - **NEW**: Automated security scanning blocks `<script>` tags and `javascript:` URLs
  - **NEW**: Hardcoded credentials must include security warnings

### File Organization
```
_posts/          # Blog posts in YYYY-MM-DD-title.md format
_pages/          # Static pages (about, contact, etc.)
_includes/       # Reusable components
_layouts/        # Page templates
admin/           # Sveltia CMS (web-based content editor)
  ├── index.html # CMS application
  └── config.yml # CMS configuration
assets/
  ├── css/       # Stylesheets
  ├── js/        # JavaScript files
  └── img/       # Images (optimize before adding)
LOCAL_DEVELOPMENT.md  # Comprehensive local testing guide
IMAGE_OPTIMIZATION.md # Image optimization workflow
CLAUDE.md        # This file - Claude AI instructions
```

### Jekyll/Liquid Compatibility
- **Avoid**: `group_by_exp` (not compatible with Jekyll 3.10.0)
- **Use**: Basic Liquid filters and Jekyll 3.x compatible syntax
- **Test**: Always verify GitHub Pages compatibility

### Category Management
**CRITICAL**: Always use YAML array format for categories, never single strings.

Current categories (use exact formatting):
- "Administrator"
- "Microsoft"
- "VMware"
- "Out of Band"
- "Getting Started"
- "User"
- "Developer"
- "Infrastructure"
- "Athletics"
- "Review"

**Correct format:**
```yaml
categories:
- "Category Name"
```

**WRONG format (breaks category parsing):**
```yaml
categories: "Category Name"
```

### Git Workflow (CI/CD Protected)
**CRITICAL: Direct commits to `main` are BLOCKED by branch protection rules**

**Required Development Process:**
1. **Check if current work is on main branch after previous PR merge:**
   ```bash
   git status  # Check current branch
   git pull origin main  # Pull latest if on main
   ```
2. **Create new feature branch** (always required for new changes):
   ```bash
   git checkout -b feature/descriptive-name
   ```
3. Test locally thoroughly (failures will block PR merging)
4. Push branch: `git push -u origin feature/descriptive-name`
5. **Create pull request automatically:**
   ```bash
   gh pr create --title "Descriptive PR title" --body "PR description"
   ```
6. Wait for automated status check to pass:
   - PR Build & Test (comprehensive validation: security, frontmatter, builds, structure checks)
7. Review build validation results in PR comments
8. Get required review approval (minimum 1)
9. Merge only after ALL checks pass and conversations resolved
10. Never commit sensitive information

### Post-PR Cleanup (After Merge)
1. **Switch back to main and pull latest:**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Delete local feature branch:**
   ```bash
   git branch -d feature/branch-name
   ```
3. **Optional: Delete remote branch:**
   ```bash
   git push origin --delete feature/branch-name
   ```
4. **Verify clean state:**
   ```bash
   git status  # Should show "nothing to commit, working tree clean"
   ```

**PR Build Validation:**
- Every PR runs comprehensive build validation
- Automated build status comments with detailed results
- Security, performance, and accessibility checks included

## Common Tasks

### Adding a New Post

#### Method 1: Automated Blog Post Creation (Recommended)
1. **Create new issue** using "📝 New Blog Post" template
2. **Fill out all required fields:**
   - Post Title (required)
   - Category (dropdown with current blog categories)
   - Post Excerpt (required for SEO)
   - Post Content (markdown supported)
   - Tags (optional, comma-separated)
   - Author (defaults to Matt Griffin)
3. **Add "new post" label** to trigger automation
4. **Workflow automatically:**
   - Creates markdown file in `_posts/`
   - Downloads images from issue attachments to `assets/img/`
   - Converts HTML img tags to semantic HTML or markdown
   - Generates `<figure>/<figcaption>` tags when captions detected
   - Preserves alt text for accessibility
   - Creates PR with complete blog post
5. **Review and merge PR** to publish

**Issue Template Features:**
- Form validation for required fields
- Category dropdown with current blog categories
- Image upload support with automatic processing
- Smart image handling: HTML figures for captioned images
- Alt text preservation for accessibility
- Automatic filename generation based on date and title

#### Method 2: Sveltia CMS - WYSIWYG Editor (NEW)
**Web-based content editor with visual interface and mobile support.**

1. **Access the CMS:**
   - Navigate to: `https://mattblogsit.com/admin`
   - Login with GitHub OAuth or Personal Access Token
   - See [SVELTIA_CMS_SETUP.md](SVELTIA_CMS_SETUP.md) for initial setup

2. **Create new post:**
   - Click **"New Blog Post"** button
   - Fill in form fields with validation:
     - **Title**: Required for SEO and display
     - **Date**: Auto-filled with today (YYYY-MM-DD format)
     - **Categories**: Dropdown with approved categories (1-3 required)
     - **Excerpt**: 50-200 characters for SEO (validated)
     - **Tags**: Optional, lowercase-with-hyphens
     - **Body**: Markdown editor with formatting toolbar

3. **Upload images:**
   - Drag-and-drop images into editor
   - Images saved to `assets/img/`
   - CI/CD auto-optimizes images >500KB

4. **Save and publish:**
   - Click **"Save"** → Auto-commits to GitHub
   - GitHub Actions triggers build
   - Post live in 2-3 minutes

**CMS Features:**
- ✅ WYSIWYG markdown editor with preview
- ✅ Category dropdown prevents typos
- ✅ Field validation (excerpt length, date format)
- ✅ Mobile-responsive (edit from phone/tablet)
- ✅ Drag-and-drop image uploads
- ✅ Search existing posts
- ✅ Auto-commits to GitHub with proper frontmatter

**Authentication Options:**
- **OAuth (Recommended)**: One-click "Login with GitHub" via free Cloudflare Workers
- **PAT Alternative**: Authenticate with GitHub Personal Access Token
- Both methods are 100% free forever

#### Method 3: Manual Blog Post Creation
1. **Follow Git Workflow above** - ensure on new feature branch first
2. Create file in `_posts/` with format: `YYYY-MM-DD-descriptive-title.md`
3. Include **MANDATORY** frontmatter (CI/CD validation will fail without these):
```yaml
---
title: "Your Title Here"        # REQUIRED - validation enforced
date: YYYY-MM-DD               # REQUIRED - must be YYYY-MM-DD format
categories:                    # REQUIRED - MUST use YAML array format
- "Category Name"               # CRITICAL: Never use single string format
excerpt: "Brief description for SEO and previews..."
tags:
- relevant-tag
---
```
4. Test locally before pushing (builds must pass for PR approval)
5. Create PR automatically with `gh pr create`

### Updating Categories
- Always use title case with quotes for multi-word categories
- Update only in YAML frontmatter, not post content
- Maintain consistency across all posts

### Image Optimization (CRITICAL)
**All images MUST be optimized before committing to prevent performance issues.**

**Quick Start:**
```bash
# One-time setup (install tools and git hooks)
./scripts/setup-git-hooks.sh
brew install imagemagick optipng jpegoptim webp  # macOS
# OR
sudo apt-get install imagemagick optipng jpegoptim webp  # Linux

# Optimize all images
./scripts/optimize-images.sh
```

**Size Limits (Enforced):**
- **>500KB**: ❌ Commit BLOCKED by pre-commit hook
- **300-500KB**: ⚠️ Warning issued
- **<300KB**: ✅ Optimized

**Automated Protection:**
1. **Pre-commit Hook**: Validates images locally before commit
2. **GitHub Actions**: Checks all PR images, comments with report
3. **CI/CD Status**: Blocks merge if images >500KB

**See [IMAGE_OPTIMIZATION.md](IMAGE_OPTIMIZATION.md) for complete guide**

### Image Handling Best Practices

**GitHub Pages Standard:** Use semantic HTML for images with captions
```html
<figure class="aligncenter">
  <img src="{{ site.baseurl }}/assets/img/photo.jpg" alt="Descriptive alt text">
  <figcaption>Caption text describing the image</figcaption>
</figure>
```

**When to use each format:**
- **HTML `<figure>/<figcaption>`**: For images with captions (semantic, accessible)
- **Markdown `![alt](url)`**: For simple inline images without captions
- **Never use**: Markdown image + italic text for captions (not semantic)

**Image optimization requirements:**
- Maximum file size: 500KB (warnings triggered above this)
- Preferred formats: WebP with JPEG/PNG fallbacks
- Always include descriptive alt text for accessibility
- Use `class="aligncenter"` for centered images
- Use `class="alignleft"` or `class="alignright"` for floated images

### Performance Optimization
1. Compress images before uploading (use WebP when possible)
2. Minimize CSS/JS in production
3. Use lazy loading for images
4. Implement caching strategies
5. Conditional JavaScript loading (only load on pages that need it)

### Responsive Design Standards
**CRITICAL**: Only use 2 responsive modes - NO tablet-specific breakpoints
- **Mobile/Tablet**: `@media (max-width: 1024px)` - covers phones and tablets
- **Desktop**: Default styles (min-width: 1025px) - covers desktop and large screens

**NEVER use these patterns:**
- ❌ `@media (min-width: 481px) and (max-width: 1024px)` (tablet-specific)
- ❌ `@media (max-width: 768px)` and separate tablet queries
- ❌ Multiple breakpoints for different device sizes

**Always use:**
- ✅ Single mobile/tablet query: `@media (max-width: 1024px)`
- ✅ Mobile-first approach with progressive enhancement
- ✅ Consistent spacing variables (`var(--spacing-md)`) instead of hardcoded values

### Mobile UI Standards
- **Button Alignment**: All mobile UI elements must use `var(--spacing-md)` for positioning
- **Theme Consistency**: Components must adapt to light/dark themes using CSS variables
- **Touch Targets**: Minimum 44px × 44px for mobile buttons
- **Unified Design**: Mobile elements should share consistent borders, shadows, hover states

### Mobile Button Best Practices
- Use semantic class names (`.hamburger-line` not generic spans)
- Theme-aware colors: `var(--text-primary)`, `var(--accent-primary)`
- Consistent spacing: CSS variables instead of hardcoded values
- Simple state transitions: Prefer opacity/scale over complex transforms

### Local Development & Testing

**📖 COMPREHENSIVE GUIDE:** See [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md) for complete setup, troubleshooting, and testing procedures.

#### Quick Start

**First Time Setup:**
```bash
# 1. Install dependencies
bundle install

# 2. Start development server
bundle exec jekyll serve --baseurl ""

# 3. Open browser to http://127.0.0.1:4000/
```

**Common Commands:**
```bash
# Standard development server
bundle exec jekyll serve --baseurl ""

# With drafts
bundle exec jekyll serve --baseurl "" --drafts

# Production build testing
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""

# macOS users (if bundle not in PATH)
/opt/homebrew/lib/ruby/gems/3.4.0/bin/bundle exec jekyll serve --baseurl ""

# Stop server
# Press Ctrl+C
```

**Access:** `http://127.0.0.1:4000/` (use 127.0.0.1, not localhost)

#### Critical Testing Requirements

**Before creating any PR, you MUST:**
- ✅ Test development build (`bundle exec jekyll serve`)
- ✅ Test production build (`JEKYLL_ENV=production jekyll build`)
- ✅ Verify responsive design: Mobile/tablet (≤1024px) and Desktop (>1024px)
- ✅ Test light AND dark theme switching
- ✅ Verify all navigation links work correctly
- ✅ Check browser console for errors (F12 > Console)
- ✅ Confirm all assets load (CSS, JS, images)
- ✅ Test mobile hamburger menu functionality

**Quick Verification:**
1. **Navigation:** Test all menu links, categories, archives
2. **Assets:** CSS styling loads, images display, no 404 errors
3. **Features:** Theme switcher, search, mobile menu, image modals
4. **Responsive:** Test at >1024px (desktop) and ≤1024px (mobile/tablet)

**Important Notes:**
- Server auto-regenerates on file changes (except `_config.yml`)
- Restart server after modifying `_config.yml`
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R) to clear CSS cache
- **Build failures will block PR merging** - test locally first!

**Ruby Compatibility:**
- **Local:** Any Ruby 3.x version works
- **GitHub Actions:** Ruby 3.1.7 with Bundler ~2.6.0
- **Gemfile.lock:** Intentionally not committed (environment-specific)

**Need detailed help?** See [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md) for:
- Complete setup instructions from scratch
- Comprehensive verification checklist (navigation, assets, functionality)
- Advanced testing scenarios (drafts, production builds, performance)
- Detailed troubleshooting guide (all common issues covered)
- Environment differences (dev vs production, local vs GitHub Pages)

### Pre-PR Validation Checklist
- [ ] **Build**: Both dev and production builds successful
- [ ] **Responsive**: Tested mobile/tablet (≤1024px) and desktop (>1024px)
- [ ] **Themes**: Light and dark mode work correctly
- [ ] **Mobile UI**: Buttons aligned using CSS variables
- [ ] **Accessibility**: Images have alt attributes
- [ ] **Performance**: CSS <100KB, images <500KB
- [ ] **Security**: No `<script>` tags or `javascript:` URLs
- [ ] **Categories**: YAML array format, not single strings

## Current Limitations
- Cannot use jekyll-paginate-v2 (not GitHub Pages compatible)
- Limited to GitHub Pages safe plugins
- Client-side search only (no server-side processing)
- No database functionality (static site only)
- **NEW**: All changes require PR workflow (no direct commits to main)
- **NEW**: Build failures block all merging until resolved  
- **NEW**: Minimum 1 review required for all PRs
- **NEW**: PR Build & Test validation must pass before merging
- **NEW**: CI/CD Pipeline only runs on main (deployment-focused, no duplicate validation)

## Future Considerations
- Implement Progressive Web App features
- Add newsletter functionality via external service
- Enhance search with Algolia or similar
- ~~Create GitHub Actions for automated testing~~ ✅ **IMPLEMENTED**
- Add comment system (Disqus, Utterances, etc.)

## Helpful Context for Claude
When working on this blog:
1. **MANDATORY**: All changes must go through pull requests (direct commits blocked)
2. **CRITICAL**: Always check git status and create new feature branches before starting work
3. Always consider GitHub Pages limitations
4. Prioritize accessibility and performance
5. Focus on defensive security practices
6. Maintain consistent code style
7. **CRITICAL**: Test all changes locally before pushing (build failures block PRs)
8. Consider mobile-first responsive design
9. Follow SEO best practices for technical content
10. **NEW**: All blog posts require valid frontmatter (title, date, categories)
11. **NEW**: Security scanning enforced (no `<script>` tags, `javascript:` URLs)
12. **NEW**: Performance monitoring (warnings for large files)
13. **NEW**: PR build validation with comprehensive automated testing
14. **NEW**: Use `gh pr create` for automatic PR creation with detailed descriptions

## Troubleshooting

**📖 DETAILED TROUBLESHOOTING:** See [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md#troubleshooting) for comprehensive solutions to all common issues.

### Quick Fixes (Most Common Issues)

**Jekyll Server Issues:**
- **Server won't start**: Run `bundle install` first, then `bundle exec jekyll serve --baseurl ""`
- **Site not loading**: Use `http://127.0.0.1:4000/` not `localhost:4000`
- **Port already in use**: Kill existing process with `pkill -f jekyll`
- **Changes not reflecting**: Restart server after `_config.yml` changes
- **CSS not updating**: Hard refresh browser (`Cmd+Shift+R` or `Ctrl+Shift+R`)

**Git Workflow Issues:**
- **PR blocked**: Check build validation status in PR comments
- **Branch protection**: All changes must go through PRs (direct commits blocked)
- **Review required**: PRs need minimum 1 approval before merge
- **Build failures**: Review automated PR comments for specific error details
- **Merge conflicts**: Resolve in feature branch before merge

**Responsive Design Issues:**
- **Button misalignment**: Ensure all mobile elements use `var(--spacing-md)`
- **Theme conflicts**: Check components use CSS variables, not hardcoded colors
- **Tablet-specific styles**: NOT ALLOWED - use only mobile/tablet (≤1024px) and desktop
- **Hamburger menu broken**: Verify JavaScript breakpoint is 1024px

**Content Issues:**
- **Category parsing errors**: Use YAML array format `- "Category"` not single strings
- **Frontmatter validation**: All posts require `title`, `date`, `categories`
- **Image optimization**: Compress images >500KB before upload (see [IMAGE_OPTIMIZATION.md](IMAGE_OPTIMIZATION.md))
- **Security scanning**: Remove any `<script>` tags or `javascript:` URLs

**Performance Issues:**
- **Slow builds**: Check for large images (>500KB) or CSS files (>100KB)
- **Assets not loading**: Verify paths use `{{ site.baseurl }}` prefix
- **Search not working**: Check browser console (F12) for JavaScript errors

**For complete troubleshooting:**
- Server startup issues → [LOCAL_DEVELOPMENT.md#server-wont-start](LOCAL_DEVELOPMENT.md#server-wont-start)
- Page navigation 404s → [LOCAL_DEVELOPMENT.md#pages-not-loading-404-errors](LOCAL_DEVELOPMENT.md#pages-not-loading-404-errors)
- Assets not loading → [LOCAL_DEVELOPMENT.md#assets-not-loading-cssjsimages](LOCAL_DEVELOPMENT.md#assets-not-loading-cssjsimages)
- Changes not appearing → [LOCAL_DEVELOPMENT.md#changes-not-reflecting](LOCAL_DEVELOPMENT.md#changes-not-reflecting)
- Ruby/Bundler issues → [LOCAL_DEVELOPMENT.md#rubybundler-issues](LOCAL_DEVELOPMENT.md#rubybundler-issues)

## Analytics Implementation

**Google Analytics 4 Setup:**
- **Tracking ID**: G-XPX6WGJE8W configured in `_config.yml`
- **Privacy Compliance**: GDPR-compliant with cookie consent banner
- **Implementation**: JavaScript files in `assets/js/analytics.js` and `assets/js/cookie-consent.js`
- **Features**: Core Web Vitals tracking, technical content events, external link tracking

**Privacy Features:**
- Cookie consent banner appears on first visit
- Google Consent Mode v2 implementation
- User can manage preferences via footer "Cookie Settings" link
- Analytics disabled by default until user consent
- No personal data collection - anonymous usage only

**Google Search Console Integration:**
1. Add property for `https://mattblogsit.com`
2. Verify ownership via Analytics property (automatic)
3. Submit sitemap: `https://mattblogsit.com/sitemap.xml`
4. Enable GA4 + Search Console data linking

**Analytics Dashboard Access:**
- View reports: [Google Analytics 4](https://analytics.google.com)
- Property: Matt Blogs IT (G-XPX6WGJE8W)
- Custom events: code interactions, external links, theme changes, search usage

## Style Guidelines

### Visual Design
- **Theme**: Clean, accessible design with light/dark mode support
- **Color Scheme**: 
  - Primary accent: Blue (#007bff light, #6ea8fe dark)
  - Text: High contrast (#212529 light, #ffffff dark)
  - Backgrounds: White/light gray (light), Dark gray/black (dark)
- **Typography**: System fonts for optimal performance
- **Spacing**: Consistent use of spacing variables (xs: 4px to xxl: 48px)
- **Border Radius**: Subtle rounded corners (4px-12px)

### Code Style
- **CSS**: Use CSS custom properties for theming
- **JavaScript**: Vanilla JS, no frameworks required
- **HTML**: Semantic HTML5, ARIA labels for accessibility
- **Liquid**: Jekyll/Liquid templating for dynamic content

### Content Guidelines
- **Images**: Optimize before upload, use WebP with fallbacks
- **Code Blocks**: Use Rouge syntax highlighting with line numbers
- **Links**: Descriptive text, avoid "click here"
- **Headings**: Proper hierarchy (h1 → h2 → h3)

### Accessibility Standards
- **WCAG 2.1 AA Compliance**: Minimum contrast ratios
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Indicators**: Visible focus states (yellow outline)
- **Skip Links**: Available for main navigation

### Performance Targets
- **CSS**: Keep main.css under 100KB
- **Images**: Max 500KB per image
- **JavaScript**: Bundle and minify for production
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1

### File Organization
- **Mockups**: Remove from production (theme-mockups.html, accessible-theme-mockups.html)
- **Exports**: Remove WordPress XML exports from repository
- **Documentation**: Keep in markdown files, not in production

## Recent Optimizations (2025)

### Code Quality Improvements
- **Removed dead CSS**: Deleted unused `archive.css` file (3KB reduction)
- **Fixed responsive breakpoints**: Standardized all CSS to use 1024px breakpoint
- **Conditional JavaScript loading**: Scripts only load on pages that need them
  - `pagination.js`: Only on `/posts/` page
  - `modal.js`: Only on pages with images (posts, About Me)
- **CSS consolidation**: Added utility classes for common patterns

### Image & Caption Improvements
- **Converted 31 blog posts** to use semantic HTML `<figure>/<figcaption>` tags
- **Updated workflow** to automatically generate proper HTML figures
- **Improved accessibility** with semantic image-caption relationships
- **Fixed alignment issues** with centered images and styled captions

### Performance Metrics
- **CSS optimization**: Main CSS kept under 60KB despite extensive features
- **JavaScript loading**: Reduced unnecessary script loads by ~50%
- **Semantic HTML**: Improved screen reader compatibility
- **Build validation**: Automated checks prevent performance regressions

## Contact
Blog Owner: Matt Griffin
Blog Focus: IT Professional sharing knowledge about cloud, security, and infrastructure