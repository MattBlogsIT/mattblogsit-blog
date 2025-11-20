# Lighthouse CI Monitoring

Automated performance, accessibility, SEO, and best practices testing for every pull request.

## Overview

Lighthouse CI automatically runs on every PR to ensure:
- ✅ Performance scores stay above 85%
- ✅ Accessibility scores stay above 90%
- ✅ SEO scores stay above 90%
- ✅ Best practices scores stay above 90%

**PRs with failing scores will be blocked from merging.**

## What Gets Tested

### Pages
1. **Homepage** (`/index.html`)
2. **Posts Page** (`/posts/index.html`)
3. **About Page** (`/about/index.html`)

Each page is tested **3 times** and results are averaged for accuracy.

### Metrics

#### Performance
- **Target:** 85% minimum
- **First Contentful Paint (FCP):** < 2 seconds
- **Largest Contentful Paint (LCP):** < 2.5 seconds
- **Cumulative Layout Shift (CLS):** < 0.1
- **Total Blocking Time (TBT):** < 300ms

#### Accessibility
- **Target:** 90% minimum (enforced)
- Screen reader support
- Keyboard navigation
- Color contrast ratios
- ARIA labels

#### SEO
- **Target:** 90% minimum (enforced)
- Meta descriptions
- Structured data
- Mobile-friendly
- Valid HTML

#### Best Practices
- **Target:** 90% minimum
- HTTPS usage
- Security headers
- No browser errors
- Modern image formats

## How It Works

### On Pull Requests

1. **Build:** Jekyll builds the site in production mode
2. **Test:** Lighthouse CI tests 3 pages, 3 runs each (9 total tests)
3. **Report:** Results posted as PR comment
4. **Assert:** Scores compared against budgets
5. **Block/Pass:** PR blocked if scores below thresholds

### Workflow Triggers

```yaml
on:
  pull_request:
    branches:
      - main
```

Runs automatically on:
- New pull requests
- New commits pushed to PR
- PR updates

## Configuration

### Budget Settings (`lighthouserc.json`)

```json
{
  "assertions": {
    "categories:performance": ["warn", {"minScore": 0.85}],
    "categories:accessibility": ["error", {"minScore": 0.90}],
    "categories:seo": ["error", {"minScore": 0.90}]
  }
}
```

**Severity Levels:**
- `error` - Blocks PR merge
- `warn` - Shows warning but allows merge
- `off` - Disabled

### Adjusting Budgets

To change score thresholds, edit `lighthouserc.json`:

```json
"categories:performance": ["warn", {"minScore": 0.90}]  // Increase to 90%
```

### Adding Pages to Test

Edit `lighthouserc.json` > `collect` > `url`:

```json
"url": [
  "http://localhost/index.html",
  "http://localhost/posts/index.html",
  "http://localhost/about/index.html",
  "http://localhost/category/index.html"  // Add new page
]
```

## Local Testing

### Install Dependencies

```bash
npm install
```

### Run Lighthouse CI Locally

```bash
# Build and test
npm run lhci:local

# Or manually
bundle exec jekyll build --baseurl ''
npx lhci autorun
```

### View Results

Results saved to `.lighthouseci/` directory:
- `manifest.json` - Run metadata
- `lhr-*.json` - Lighthouse reports
- `lhr-*.html` - HTML reports (open in browser)

## Understanding Results

### PR Comment Format

```
Lighthouse CI Results

Homepage
Performance: 92% ✅
Accessibility: 95% ✅
SEO: 100% ✅
Best Practices: 93% ✅

Posts Page
Performance: 88% ✅
Accessibility: 96% ✅
SEO: 98% ✅
Best Practices: 90% ✅
```

### Score Ranges
- **90-100:** Excellent ✅
- **50-89:** Needs improvement ⚠️
- **0-49:** Poor ❌

## Common Issues

### Performance Score Too Low

**Causes:**
- Large images (>500KB)
- Too much JavaScript
- Render-blocking resources
- No lazy loading

**Fixes:**
- Optimize images (see IMAGE_OPTIMIZATION.md)
- Use WebP format (see WEBP_IMAGES.md)
- Defer non-critical JavaScript
- Enable lazy loading

### Accessibility Score Too Low

**Causes:**
- Missing alt text on images
- Poor color contrast
- Missing ARIA labels
- Invalid HTML

**Fixes:**
- Add alt text to all images
- Increase text contrast
- Add proper ARIA labels
- Validate HTML

### SEO Score Too Low

**Causes:**
- Missing meta descriptions
- No structured data
- Non-mobile-friendly
- Missing canonical URLs

**Fixes:**
- Add meta descriptions to posts
- Implement structured data (already done)
- Test mobile responsiveness
- Add canonical URLs (already done)

## Excluding Audits

To skip specific audits, edit `lighthouserc.json`:

```json
"assertions": {
  "uses-responsive-images": "off",  // Disable this check
  "offscreen-images": "off"          // Disable this check
}
```

## Performance Budgets

### Resource Budgets

Add to `lighthouserc.json`:

```json
"budgets": [
  {
    "path": "/*",
    "resourceSizes": [
      {
        "resourceType": "script",
        "budget": 200
      },
      {
        "resourceType": "stylesheet",
        "budget": 100
      },
      {
        "resourceType": "image",
        "budget": 1000
      }
    ]
  }
]
```

**Budgets in KB:**
- JavaScript: 200KB
- CSS: 100KB
- Images: 1000KB (total per page)

## Historical Tracking

### Option 1: GitHub Actions Artifacts

Results saved as artifacts for 30 days:
1. Go to Actions tab
2. Click on workflow run
3. Download "lighthouse-results" artifact

### Option 2: Lighthouse CI Server

For long-term tracking, set up Lighthouse CI server:

```bash
# Install
npm install -g @lhci/server

# Start server
lhci server --port=9001

# Update lighthouserc.json
"upload": {
  "target": "lhci",
  "serverBaseUrl": "http://localhost:9001"
}
```

## Troubleshooting

### Build Fails

```bash
# Check Jekyll build locally
bundle exec jekyll build --baseurl ''

# Check for errors
cat _site/index.html
```

### Tests Time Out

Increase timeout in `lighthouserc.json`:

```json
"collect": {
  "settings": {
    "maxWaitForLoad": 60000
  }
}
```

### Inconsistent Scores

Scores vary by ±5 points naturally. Run multiple times:

```json
"collect": {
  "numberOfRuns": 5  // Increase for more stability
}
```

### False Positives

Some warnings are expected:
- `uses-responsive-images` - Jekyll doesn't auto-generate srcset
- `offscreen-images` - May warn even with lazy loading
- `unused-css-rules` - Some CSS is for dynamic content

Set these to `"warn"` or `"off"` if they cause issues.

## CI/CD Integration

### Workflow Status

Check status in PR:
- ✅ Green checkmark = All tests passed
- ❌ Red X = Tests failed (scores below budgets)
- 🟡 Yellow dot = Running

### Merge Requirements

PR cannot merge if:
- Performance < 85% (warning only)
- Accessibility < 90% (enforced)
- SEO < 90% (enforced)
- Best Practices < 90% (warning only)

## Best Practices

1. **Test locally first** before pushing to PR
2. **Check all pages** not just homepage
3. **Monitor trends** over time, not just individual scores
4. **Fix errors** before warnings
5. **Update budgets** as site improves

## Resources

- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Lighthouse CI GitHub](https://github.com/GoogleChrome/lighthouse-ci)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Lighthouse Scoring Guide](https://web.dev/performance-scoring/)

## Support

If Lighthouse CI is blocking valid PRs:

1. Check local results: `npm run lhci:local`
2. Review specific failing audits
3. Adjust budgets in `lighthouserc.json` if needed
4. Document why certain audits are disabled
