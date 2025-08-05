# Matt Blogs IT

This is the GitHub Pages version of Matt Blogs IT, converted from WordPress.

## Local Development

To run the site locally:

1. Install Jekyll and bundler gems:
   ```bash
   gem install jekyll bundler
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Run the site:
   ```bash
   bundle exec jekyll serve
   ```

4. Visit http://localhost:4000 in your browser

## GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose the main/master branch
5. Your site will be available at https://[username].github.io/[repository-name]/

## Structure

- `_posts/`: Blog posts in Jekyll format (YYYY-MM-DD-title.md)
- `pages/`: Static pages (About, Contact, etc.)
- `assets/`: Images, CSS, and other assets
- `_layouts/`: Jekyll layout templates
- `_config.yml`: Jekyll configuration

## Notes

- All WordPress posts have been converted to Jekyll format
- Images have been relocated to `/assets/images/`
- The site uses the built-in GitHub Pages themes