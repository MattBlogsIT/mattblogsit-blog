# GitHub Actions Workflows

This directory contains the CI/CD workflows for the Matt Blogs IT Jekyll site.

## Workflows

### 1. `static.yml` - Production Deployment
- **Trigger**: Push to `main` branch, manual dispatch
- **Purpose**: Builds and deploys the production site to GitHub Pages
- **Features**:
  - Dynamic archive and category page generation
  - Production Jekyll build
  - Automatic deployment to GitHub Pages

### 2. `pr-preview.yml` - PR Preview Deployment
- **Trigger**: Pull request events (opened, updated, closed)
- **Purpose**: Creates preview deployments for pull requests
- **Features**:
  - Builds site with PR-specific baseurl
  - Deploys to preview branch (`gh-pages-preview`)
  - Posts preview link as PR comment
  - Includes testing checklist
  - Automatic cleanup on PR close

### 3. `ci-cd.yml` - Comprehensive CI/CD Pipeline
- **Trigger**: Pull requests and pushes to `main`/`develop`
- **Purpose**: Quality assurance and testing
- **Jobs**:
  - **Code Quality & Security**: Configuration validation, frontmatter checks, security scans
  - **Build Validation**: Tests both dev and production builds, performance checks
  - **Integration Tests**: HTTP tests of built site functionality
  - **Report Results**: Automated PR status comments

## Preview Deployment Setup

The preview deployment system requires:

1. A `gh-pages-preview` branch for storing preview builds
2. GitHub Pages configured to serve from this branch (optional)
3. Proper repository permissions for GitHub Actions

## Status Checks for Branch Protection

When setting up branch protection for `main`, include these required status checks:

- `CI/CD Pipeline / Code Quality & Security`
- `CI/CD Pipeline / Build Validation`
- `CI/CD Pipeline / Integration Tests` 
- `PR Preview Build & Test / build-and-test`

## Testing Locally

Before creating a PR, test your changes locally:

```bash
# Install dependencies
bundle install

# Test development build
bundle exec jekyll serve --baseurl ""

# Test production build
JEKYLL_ENV=production bundle exec jekyll build --baseurl "/mattblogsit-dev"
```

## Workflow Permissions

The workflows require these GitHub token permissions:

- `contents: read` - Read repository content
- `pages: write` - Deploy to GitHub Pages  
- `pull-requests: write` - Comment on PRs
- `checks: write` - Update PR status checks
- `security-events: write` - Security scanning results

## Customization

To adapt these workflows for other repositories:

1. Update repository name and URLs in workflow files
2. Modify baseurl paths in build commands
3. Adjust required status checks in branch protection
4. Customize testing requirements as needed