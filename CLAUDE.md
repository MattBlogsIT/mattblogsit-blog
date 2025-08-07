# Claude AI Assistant Instructions - Matt Blogs IT

## Project Overview
This is a personal blog focused on IT, Cloud, and Cybersecurity topics built with Jekyll and hosted on GitHub Pages. The blog aims to share technical knowledge, tutorials, and insights about technology infrastructure, automation, and security.

## Key Technical Details
- **Framework**: Jekyll 3.10.0 (GitHub Pages compatible)
- **Hosting**: GitHub Pages (https://mattgrif.github.io/mattblogsit-dev)
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
  - **NEW**: Images >500KB trigger warnings
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
assets/
  ├── css/       # Stylesheets
  ├── js/        # JavaScript files
  └── img/       # Images (optimize before adding)
```

### Jekyll/Liquid Compatibility
- **Avoid**: `group_by_exp` (not compatible with Jekyll 3.10.0)
- **Use**: Basic Liquid filters and Jekyll 3.x compatible syntax
- **Test**: Always verify GitHub Pages compatibility

### Category Management
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

### Git Workflow (CI/CD Protected)
**CRITICAL: Direct commits to `main` are BLOCKED by branch protection rules**

**Required Development Process:**
1. Create feature branch: `git checkout -b feature/descriptive-name`
2. Test locally thoroughly (failures will block PR merging)
3. Push branch: `git push origin feature/descriptive-name`
4. Create pull request via GitHub
5. Wait for all 4 automated status checks to pass:
   - Code Quality & Security (security scans, frontmatter validation)
   - Build Validation (dev and production builds)
   - Integration Tests (site structure, performance checks)
   - PR Preview Build & Test (preview deployment)
6. Review PR preview at: `https://mattgrif.github.io/mattblogsit-dev/pr-{number}`
7. Get required review approval (minimum 1)
8. Merge only after ALL checks pass and conversations resolved
9. Never commit sensitive information

**PR Preview System:**
- Every PR automatically creates preview deployment
- Automated testing checklist added to PR comments
- HTMLProofer validation runs when available

## Common Tasks

### Adding a New Post
1. Create feature branch first: `git checkout -b feature/new-post-name`
2. Create file in `_posts/` with format: `YYYY-MM-DD-descriptive-title.md`
3. Include **MANDATORY** frontmatter (CI/CD validation will fail without these):
```yaml
---
title: "Your Title Here"        # REQUIRED - validation enforced
date: YYYY-MM-DD               # REQUIRED - must be YYYY-MM-DD format
categories:                    # REQUIRED - at least one category
- "Category Name"
excerpt: "Brief description for SEO and previews..."
tags:
- relevant-tag
---
```
4. Test locally before pushing (builds must pass for PR approval)
5. Follow Git Workflow above for PR creation and review

### Updating Categories
- Always use title case with quotes for multi-word categories
- Update only in YAML frontmatter, not post content
- Maintain consistency across all posts

### Performance Optimization
1. Compress images before uploading (use WebP when possible)
2. Minimize CSS/JS in production
3. Use lazy loading for images
4. Implement caching strategies

### Testing Commands
```bash
# Local development (use full path on this system)
/opt/homebrew/lib/ruby/gems/3.4.0/bin/bundle exec jekyll serve --baseurl ""

# Alternative local development (if bundle is in PATH)
bundle exec jekyll serve --baseurl ""

# Production build testing (CRITICAL - CI/CD enforces this)
JEKYLL_ENV=production bundle exec jekyll build --baseurl "/mattblogsit-dev"

# Check for broken links
bundle exec htmlproofer ./_site

# Quick local test with drafts
/opt/homebrew/lib/ruby/gems/3.4.0/bin/bundle exec jekyll serve --baseurl "" --drafts
```

**Important Notes for Local Testing:**
- **CRITICAL**: Test BOTH development and production builds before creating PR
- Always use `--baseurl ""` to override the GitHub Pages baseurl for local testing
- The server runs at `http://127.0.0.1:4000/` (not localhost:4000)
- Use the full bundle path `/opt/homebrew/lib/ruby/gems/3.4.0/bin/bundle` if bundle command not found
- Press Ctrl+C to stop the local server
- The site auto-regenerates when files change (except _config.yml)
- Test both light and dark themes during local development
- **Local testing is now mandatory** - build failures will block PR merging

## Current Limitations
- Cannot use jekyll-paginate-v2 (not GitHub Pages compatible)
- Limited to GitHub Pages safe plugins
- Client-side search only (no server-side processing)
- No database functionality (static site only)
- **NEW**: All changes require PR workflow (no direct commits to main)
- **NEW**: Build failures block all merging until resolved
- **NEW**: Minimum 1 review required for all PRs
- **NEW**: All 4 CI/CD status checks must pass before merging

## Future Considerations
- Implement Progressive Web App features
- Add newsletter functionality via external service
- Enhance search with Algolia or similar
- ~~Create GitHub Actions for automated testing~~ ✅ **IMPLEMENTED**
- Add comment system (Disqus, Utterances, etc.)

## Helpful Context for Claude
When working on this blog:
1. **MANDATORY**: All changes must go through pull requests (direct commits blocked)
2. Always consider GitHub Pages limitations
3. Prioritize accessibility and performance
4. Focus on defensive security practices
5. Maintain consistent code style
6. **CRITICAL**: Test all changes locally before pushing (build failures block PRs)
7. Consider mobile-first responsive design
8. Follow SEO best practices for technical content
9. **NEW**: All blog posts require valid frontmatter (title, date, categories)
10. **NEW**: Security scanning enforced (no `<script>` tags, `javascript:` URLs)
11. **NEW**: Performance monitoring (warnings for large files)
12. **NEW**: PR previews available at custom URLs for testing

## Contact
Blog Owner: Matt Griffin
Blog Focus: IT Professional sharing knowledge about cloud, security, and infrastructure