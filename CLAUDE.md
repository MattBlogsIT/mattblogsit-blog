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
- **Accessibility**: Maintain WCAG 2.1 AA compliance
- **Performance**: Optimize for Core Web Vitals (LCP, CLS, FID)
- **SEO**: Include meta descriptions, structured data, proper headings
- **Security**: Sanitize code examples, use HTTPS, follow responsible disclosure

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

### Git Workflow
1. Create feature branches for significant changes
2. Test locally with `bundle exec jekyll serve`
3. Commit with descriptive messages
4. Create PRs for review before merging
5. Never commit sensitive information

## Common Tasks

### Adding a New Post
1. Create file in `_posts/` with format: `YYYY-MM-DD-descriptive-title.md`
2. Include frontmatter:
```yaml
---
title: "Your Title Here"
date: YYYY-MM-DD
categories:
- "Category Name"
excerpt: "Brief description for SEO and previews..."
tags:
- relevant-tag
---
```

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

# Build for production
bundle exec jekyll build

# Check for broken links
bundle exec htmlproofer ./_site

# Quick local test with drafts
/opt/homebrew/lib/ruby/gems/3.4.0/bin/bundle exec jekyll serve --baseurl "" --drafts
```

**Important Notes for Local Testing:**
- Always use `--baseurl ""` to override the GitHub Pages baseurl for local testing
- The server runs at `http://127.0.0.1:4000/` (not localhost:4000)
- Use the full bundle path `/opt/homebrew/lib/ruby/gems/3.4.0/bin/bundle` if bundle command not found
- Press Ctrl+C to stop the local server
- The site auto-regenerates when files change (except _config.yml)
- Test both light and dark themes during local development

## Current Limitations
- Cannot use jekyll-paginate-v2 (not GitHub Pages compatible)
- Limited to GitHub Pages safe plugins
- Client-side search only (no server-side processing)
- No database functionality (static site only)

## Future Considerations
- Implement Progressive Web App features
- Add newsletter functionality via external service
- Enhance search with Algolia or similar
- Create GitHub Actions for automated testing
- Add comment system (Disqus, Utterances, etc.)

## Helpful Context for Claude
When working on this blog:
1. Always consider GitHub Pages limitations
2. Prioritize accessibility and performance
3. Focus on defensive security practices
4. Maintain consistent code style
5. Test all changes locally before committing
6. Consider mobile-first responsive design
7. Follow SEO best practices for technical content

## Contact
Blog Owner: Matt Griffin
Blog Focus: IT Professional sharing knowledge about cloud, security, and infrastructure