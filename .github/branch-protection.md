# Branch Protection Configuration

This document outlines the recommended branch protection settings for the `main` branch to ensure code quality and prevent direct pushes.

## Recommended Settings

### Branch Protection Rules for `main`:

1. **Require pull request reviews before merging**
   - ✅ Required number of reviewers: 1 (can be yourself for personal projects)
   - ✅ Dismiss stale reviews when new commits are pushed
   - ✅ Require review from code owners (if CODEOWNERS file exists)

2. **Require status checks to pass before merging**
   - ✅ Require branches to be up to date before merging
   - **Required status checks:**
     - `CI/CD Pipeline / Code Quality & Security`
     - `CI/CD Pipeline / Build Validation` 
     - `CI/CD Pipeline / Integration Tests`
     - `PR Preview Build & Test / build-and-test`

3. **Require conversation resolution before merging**
   - ✅ All conversations on code must be resolved

4. **Require signed commits**
   - ⚠️  Optional but recommended for enhanced security

5. **Include administrators**
   - ✅ Apply rules to administrators (recommended even for personal repos)

6. **Restrict pushes that create files**
   - ✅ Restrict pushes to matching branches
   - ✅ Do not allow force pushes
   - ✅ Do not allow deletions

## Setup Instructions

### Option 1: GitHub Web Interface

1. Go to repository Settings → Branches
2. Click "Add rule" for branch name pattern: `main`
3. Configure the settings listed above
4. Click "Create" to save the rule

### Option 2: GitHub CLI (if available)

```bash
# Enable branch protection for main branch
gh api repos/mattgrif/mattblogsit-dev/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["CI/CD Pipeline / Code Quality & Security","CI/CD Pipeline / Build Validation","CI/CD Pipeline / Integration Tests","PR Preview Build & Test / build-and-test"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field required_conversation_resolution=true \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

### Option 3: Repository Configuration File

Create `.github/settings.yml` for use with the Settings app:

```yaml
repository:
  name: mattblogsit-dev
  description: Personal blog focused on IT, Cloud, and Cybersecurity topics
  private: false
  has_issues: true
  has_projects: false
  has_wiki: false

branches:
  - name: main
    protection:
      required_status_checks:
        strict: true
        contexts:
          - "CI/CD Pipeline / Code Quality & Security"
          - "CI/CD Pipeline / Build Validation" 
          - "CI/CD Pipeline / Integration Tests"
          - "PR Preview Build & Test / build-and-test"
      enforce_admins: true
      required_pull_request_reviews:
        required_approving_review_count: 1
        dismiss_stale_reviews: true
        require_code_owner_reviews: true
      required_conversation_resolution: true
      restrictions: null
      allow_force_pushes: false
      allow_deletions: false
```

## Workflow Integration

With these protections in place:

1. **Direct pushes to `main` are blocked**
2. **All changes must go through pull requests**
3. **PRs automatically get preview deployments**
4. **CI/CD pipeline runs on all PRs**
5. **All status checks must pass before merge**
6. **Code review is required (even self-review for personal projects)**

## Testing the Protection

1. Create a new branch: `git checkout -b test-branch-protection`
2. Make a change and push: `git push origin test-branch-protection`
3. Create a PR through GitHub interface
4. Observe that:
   - PR preview deployment is created
   - CI/CD pipeline runs automatically
   - Direct merge is blocked until checks pass
   - Status checks appear in the PR interface

## Benefits

- 🛡️  **Quality Assurance**: All code is tested before reaching main
- 🔍 **Code Review**: Every change is reviewed (even by yourself)
- 🚀 **Preview Deployments**: Test changes in isolation
- 🔒 **Security**: Prevents accidental direct pushes
- 📊 **Visibility**: Clear status of all checks in PR interface
- 🏗️  **Reliability**: Production deployments only from tested code