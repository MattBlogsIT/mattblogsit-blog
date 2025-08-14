# Matt Blogs IT

A personal blog focused on IT, Cloud, and Cybersecurity topics built with Jekyll and hosted on GitHub Pages.

🌐 **Live Site**: [https://mattblogsit.com](https://mattblogsit.com)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Contributing](#contributing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Analytics](#analytics)
- [License](#license)

## 📖 About

Matt Blogs IT is a technical blog sharing knowledge and experiences in:
- ☁️ Cloud Computing (AWS, Azure, GCP)
- 🔒 Cybersecurity (Defensive security, compliance, threat analysis)
- 🏗️ Infrastructure (Networking, monitoring, automation)
- 💻 Development (PowerShell, APIs, scripting, automation tools)
- ♿ Adaptive Sports & Accessibility Technology

## ✨ Features

- 🎨 **Accessible Design**: WCAG 2.1 AA compliant with light/dark theme support
- 🔍 **Search Functionality**: Client-side search across all posts
- 📱 **Responsive Design**: Mobile-first approach for all devices
- 🚀 **Performance Optimized**: Optimized for Core Web Vitals
- 📊 **Analytics**: Privacy-compliant Google Analytics 4 integration
- 🔐 **Security**: Content Security Policy, secure headers, no tracking without consent
- 📝 **Markdown Support**: Write posts in Markdown with syntax highlighting
- 🗂️ **Category Organization**: Posts organized by technical categories

## 🛠️ Tech Stack

- **Static Site Generator**: Jekyll 3.10.0 (GitHub Pages compatible)
- **Hosting**: GitHub Pages with custom domain
- **Languages**: HTML, CSS, JavaScript, Liquid templating
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Analytics**: Google Analytics 4 with cookie consent

## 🚀 Getting Started

### Prerequisites

- Ruby 3.x
- Bundler
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MattBlogsIT/mattblogsit-blog.git
cd mattblogsit-blog
```

2. Install dependencies:
```bash
bundle install
```

3. Run locally:
```bash
# Development server
bundle exec jekyll serve --baseurl ""

# Or with full path if bundle not in PATH
/opt/homebrew/lib/ruby/gems/3.4.0/bin/bundle exec jekyll serve --baseurl ""
```

4. Open browser to `http://127.0.0.1:4000/`

## 💻 Development

### Creating a New Post

#### Option 1: Automated via GitHub Issue
1. Go to [Issues](https://github.com/MattBlogsIT/mattblogsit-blog/issues/new/choose)
2. Select "📝 New Blog Post" template
3. Fill out the form with your post content
4. Submit the issue - it will automatically:
   - Create a properly formatted blog post
   - Open a pull request for review
   - Convert the issue to a PR

#### Option 2: Manual Creation
1. Create a new branch:
```bash
git checkout -b feature/new-post
```

2. Add post file in `_posts/` with format `YYYY-MM-DD-title.md`:
```yaml
---
title: "Your Post Title"
date: YYYY-MM-DD
categories:
- "Category Name"
excerpt: "Brief description for SEO and previews"
---

Your content here...
```

3. Test locally, commit, and create a pull request

### Available Categories

- Administrator
- Microsoft
- VMware
- Out of Band
- Getting Started
- User
- Developer
- Infrastructure
- Athletics
- Review

### Project Structure

```
├── _posts/          # Blog posts
├── _pages/          # Static pages
├── _includes/       # Reusable components
├── _layouts/        # Page templates
├── assets/
│   ├── css/        # Stylesheets
│   ├── js/         # JavaScript files
│   └── img/        # Images
├── _config.yml     # Jekyll configuration
└── CLAUDE.md       # AI assistant instructions
```

## 🤝 Contributing

### Workflow

1. **All changes require pull requests** - Direct commits to main are blocked
2. Create feature branch: `git checkout -b feature/description`
3. Make changes and test locally
4. Push branch and create PR: `gh pr create`
5. Wait for automated checks to pass
6. Get review approval before merging

### Testing

Run these commands before creating a PR:

```bash
# Test production build
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""

# Check for broken links (optional)
bundle exec htmlproofer ./_site
```

## 🔄 CI/CD Pipeline

The repository uses GitHub Actions for:

- **PR Build & Test**: Validates all pull requests
  - Security scanning
  - Frontmatter validation
  - Build verification
  - Structure checks
  
- **Main Branch CI/CD**: Deploys to GitHub Pages
  - Runs on merge to main
  - Automated deployment

### Status Checks

All PRs must pass:
- Code Quality & Security
- Build Validation
- Integration Tests
- PR Preview Build & Test

## 📊 Analytics

The site uses Google Analytics 4 (ID: G-XPX6WGJE8W) with:
- GDPR-compliant cookie consent
- Anonymous data collection only
- Core Web Vitals tracking
- Custom events for technical content

## 📄 License

© 2024 Matt Griffin. All rights reserved.

The content of this blog is proprietary and may not be reproduced without permission.

## 🔗 Links

- **Live Site**: [https://mattblogsit.com](https://mattblogsit.com)
- **GitHub**: [MattBlogsIT/mattblogsit-blog](https://github.com/MattBlogsIT/mattblogsit-blog)
- **Author**: Matt Griffin

## 🐛 Issues & Support

Found a bug or have a suggestion? Please [open an issue](https://github.com/MattBlogsIT/mattblogsit-blog/issues).

---

Built with ❤️ using Jekyll and GitHub Pages