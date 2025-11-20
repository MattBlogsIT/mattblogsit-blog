---
name: Implement Lighthouse CI Monitoring
about: Add automated Lighthouse performance testing to CI/CD pipeline
title: 'DevOps: Add Lighthouse CI for automated performance monitoring'
labels: enhancement, DevOps, performance
assignees: ''
---

## Overview
Implement Lighthouse CI to automatically test performance, accessibility, SEO, and best practices on every pull request.

## Current State
- Manual testing only
- No automated performance monitoring
- No performance budgets enforced
- No regression detection

## Proposed Solution

### 1. Add Lighthouse CI GitHub Action
Location: `.github/workflows/lighthouse-ci.yml`

```yaml
name: Lighthouse CI
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install -g @lhci/cli
      - name: Build site
        run: bundle exec jekyll build
      - name: Run Lighthouse CI
        run: lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### 2. Configure Lighthouse CI
Location: `lighthouserc.json`

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./_site",
      "url": [
        "http://localhost/index.html",
        "http://localhost/posts/index.html"
      ]
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### 3. Set Performance Budgets

**Target Scores:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
- PWA: 80+ (after PWA implementation)

**Resource Budgets:**
- JavaScript: <200KB
- CSS: <100KB
- Images: <1MB total per page
- Fonts: <50KB

## Features

### Automated Testing
- Runs on every pull request
- Tests multiple pages (home, blog posts, categories)
- Compares scores against budgets
- Blocks merge if scores drop below threshold

### PR Comments
- Posts Lighthouse results as PR comment
- Shows before/after comparison
- Highlights regressions
- Links to detailed reports

### Historical Tracking
- Track performance over time
- Identify trends and regressions
- Compare branches and deployments

## Benefits
- Catch performance regressions early
- Enforce quality standards
- Data-driven optimization decisions
- Improved Core Web Vitals
- Better user experience

## Implementation Tasks

- [ ] Create `.github/workflows/lighthouse-ci.yml`
- [ ] Create `lighthouserc.json` configuration
- [ ] Set up LHCI GitHub App token
- [ ] Configure performance budgets
- [ ] Add npm package.json for Lighthouse CI dependencies
- [ ] Test on sample PR
- [ ] Document in CLAUDE.md
- [ ] Set up optional reporting dashboard

## Testing Checklist
- [ ] Lighthouse CI runs on pull requests
- [ ] Reports post to PR comments
- [ ] Budgets enforced correctly
- [ ] Multiple pages tested
- [ ] Build doesn't fail on existing site
- [ ] Results are accurate and reproducible

## Optional Enhancements
- [ ] Set up Lighthouse CI server for historical data
- [ ] Add performance dashboard
- [ ] Slack/Discord notifications for failures
- [ ] Compare against production site

## Resources
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Lighthouse CI GitHub Action](https://github.com/treosh/lighthouse-ci-action)
- [Performance Budgets Guide](https://web.dev/performance-budgets-101/)

## Notes
- Start with lenient budgets, tighten over time
- Test locally first: `npm install -g @lhci/cli && lhci autorun`
- May need to adjust budgets based on current performance
