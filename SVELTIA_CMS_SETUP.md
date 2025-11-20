# Sveltia CMS Setup Guide for Matt Blogs IT

This guide walks you through setting up Sveltia CMS with authentication for your Jekyll blog. **Choose one of two methods based on your needs.**

---

## Quick Start: Which Authentication Method?

| Factor | **OAuth (Cloudflare)** | **Personal Access Token (PAT)** |
|--------|------------------------|----------------------------------|
| Setup Time | 15 minutes | 5 minutes |
| Cost | **FREE (no credit card)** | **FREE** |
| User Experience | Click "Login with GitHub" | Paste token manually |
| Best For | Multiple editors | Solo developer |
| Recommendation | ✅ **Recommended** | Alternative |

**Both methods are 100% free forever.** Choose based on your preference.

---

## Method 1: OAuth with Cloudflare Workers (Recommended)

### Overview

Cloudflare Workers provides a **free, serverless OAuth proxy** that enables one-click "Login with GitHub" authentication.

**Free Tier Limits:**
- 100,000 requests/day (OAuth only uses ~5-20/day for your blog)
- No credit card required
- Commercial use allowed
- **Perfect for personal blogs**

---

### Step 1: Create GitHub OAuth Application

1. **Go to GitHub Developer Settings:**
   - Navigate to: https://github.com/settings/developers
   - Click **"OAuth Apps"** → **"New OAuth App"**

2. **Fill in application details:**
   ```
   Application name: Matt Blogs IT CMS
   Homepage URL: https://mattblogsit.com
   Authorization callback URL: https://YOUR-WORKER-NAME.workers.dev/callback
   ```

   ⚠️ **Note:** You'll update the callback URL after deploying your Cloudflare Worker in Step 2.

3. **Save Client ID and Client Secret:**
   - After creating, copy both values
   - You'll need these for Cloudflare Worker configuration

---

### Step 2: Deploy Sveltia CMS OAuth Worker to Cloudflare

#### Option A: Deploy with Sveltia's Pre-Built Worker (Easiest)

1. **Create Cloudflare account:**
   - Go to: https://dash.cloudflare.com/sign-up
   - Sign up (no credit card required)

2. **Deploy the OAuth worker:**
   - Go to: https://github.com/sveltia/sveltia-cms-auth
   - Click **"Deploy to Cloudflare Workers"** button
   - Follow the one-click deployment

3. **Configure environment variables:**
   - In Cloudflare Workers dashboard, find your deployed worker
   - Go to **Settings** → **Variables**
   - Add these secrets:
     ```
     GITHUB_CLIENT_ID=<your_github_client_id>
     GITHUB_CLIENT_SECRET=<your_github_client_secret>
     ```

4. **Get your Worker URL:**
   - Your worker URL will be: `https://YOUR-WORKER-NAME.workers.dev`
   - Copy this URL for the next step

#### Option B: Deploy Manually (Advanced)

If you prefer to deploy manually using Wrangler CLI:

```bash
# Install Wrangler
npm install -g wrangler

# Clone the OAuth worker repository
git clone https://github.com/sveltia/sveltia-cms-auth.git
cd sveltia-cms-auth

# Login to Cloudflare
wrangler login

# Add secrets
wrangler secret put GITHUB_CLIENT_ID
# Paste your GitHub Client ID

wrangler secret put GITHUB_CLIENT_SECRET
# Paste your GitHub Client Secret

# Deploy
wrangler deploy
```

---

### Step 3: Update GitHub OAuth Application

1. **Go back to GitHub OAuth App settings:**
   - https://github.com/settings/developers
   - Select your "Matt Blogs IT CMS" OAuth app

2. **Update Authorization callback URL:**
   ```
   https://YOUR-WORKER-NAME.workers.dev/callback
   ```

3. **Save changes**

---

### Step 4: Update CMS Configuration

1. **Edit `admin/config.yml`:**
   - Find the `backend` section
   - Uncomment and update the `base_url` line:

   ```yaml
   backend:
     name: github
     repo: MattBlogsIT/mattblogsit-blog
     branch: main
     base_url: https://YOUR-WORKER-NAME.workers.dev  # Add your worker URL
   ```

2. **Commit and push:**
   ```bash
   git add admin/config.yml
   git commit -m "Configure Sveltia CMS OAuth with Cloudflare Workers"
   git push origin main
   ```

---

### Step 5: Test Authentication

1. **Wait for GitHub Pages to rebuild** (2-3 minutes)

2. **Access the CMS:**
   - Go to: https://mattblogsit.com/admin
   - You should see the Sveltia CMS login screen

3. **Click "Login with GitHub":**
   - You'll be redirected to GitHub
   - Authorize the application
   - You'll be redirected back to the CMS
   - Success! You're now logged in

4. **Test creating a post:**
   - Click **"New Blog Post"**
   - Fill in the fields
   - Click **"Save"**
   - This will commit directly to your GitHub repository
   - Your CI/CD pipeline will automatically build and deploy

---

## Method 2: Personal Access Token (PAT) Authentication

### Overview

PAT authentication lets you authenticate with GitHub using a personal access token instead of OAuth. This is simpler but requires manually managing tokens.

---

### Step 1: Create GitHub Personal Access Token

1. **Go to GitHub Token Settings:**
   - Navigate to: https://github.com/settings/tokens?type=beta
   - Click **"Generate new token"** → **"Fine-grained token"**

2. **Configure token:**
   ```
   Token name: Matt Blogs IT CMS
   Expiration: 90 days (or custom)
   Repository access: Only select repositories
     → Select: MattBlogsIT/mattblogsit-blog

   Permissions:
     Repository permissions:
       ✅ Contents: Read and write
       ✅ Metadata: Read-only (automatic)
   ```

3. **Generate token and copy it:**
   - Click **"Generate token"**
   - **IMPORTANT:** Copy the token immediately (you won't see it again)
   - Store it securely (password manager recommended)

---

### Step 2: Configure CMS for PAT

1. **Edit `admin/config.yml`:**
   - Make sure the `base_url` line is **commented out** or **removed**:

   ```yaml
   backend:
     name: github
     repo: MattBlogsIT/mattblogsit-blog
     branch: main
     # base_url is NOT set for PAT authentication
   ```

2. **Commit and push:**
   ```bash
   git add admin/config.yml
   git commit -m "Configure Sveltia CMS for PAT authentication"
   git push origin main
   ```

---

### Step 3: Login with PAT

1. **Wait for GitHub Pages to rebuild** (2-3 minutes)

2. **Access the CMS:**
   - Go to: https://mattblogsit.com/admin

3. **Authenticate with PAT:**
   - You'll see **"Authenticate with GitHub"** button
   - Click it
   - You may see an option for **"Use Personal Access Token"**
   - Paste your PAT token
   - The CMS will store it in your browser's local storage

4. **Test creating a post:**
   - Click **"New Blog Post"**
   - Fill in the fields
   - Click **"Save"**
   - This will commit directly to GitHub using your PAT

---

### Step 4: Token Renewal

**Important:** PATs expire based on your configuration (default 90 days).

**Before token expires:**
1. Create a new PAT with the same permissions
2. Go to https://mattblogsit.com/admin
3. Logout (if available) or clear browser storage
4. Login again with the new PAT

---

## Using the CMS

Once authenticated (either method), you can:

### Create a New Blog Post

1. Click **"Blog Posts"** in the sidebar
2. Click **"New Blog Post"** button
3. Fill in the required fields:
   - **Title:** Post title
   - **Publication Date:** Auto-filled with today
   - **Categories:** Select 1-3 categories (dropdown)
   - **Excerpt:** 50-200 characters for SEO
   - **Tags:** Optional, lowercase-with-hyphens
   - **Body:** Write your content in Markdown

4. **Upload images:**
   - Click image icon in the toolbar
   - Drag and drop images
   - Images are uploaded to `assets/img/`
   - **Note:** CI/CD will automatically optimize images >500KB

5. **Preview your post:**
   - Click the **"Preview"** tab
   - See rendered markdown (not styled like your site)

6. **Save the post:**
   - Click **"Save"** button
   - Sveltia commits to GitHub automatically
   - GitHub Actions triggers build and deployment
   - Post goes live in 2-3 minutes

### Edit Existing Posts

1. Click **"Blog Posts"** in sidebar
2. Browse or search for your post
3. Click the post to open it
4. Make changes
5. Click **"Save"**
6. Changes are committed to GitHub

### Manage Images

- Images are uploaded to `assets/img/`
- Click **"Media"** in sidebar to browse all images
- Drag and drop new images
- Delete unused images

---

## Advanced Configuration

### Enable Draft Workflow

To enable draft/publish workflow:

1. **Edit `admin/config.yml`:**
   ```yaml
   # Uncomment this line:
   publish_mode: editorial_workflow
   ```

2. **How it works:**
   - Drafts are saved as PRs
   - Click "Set Status" → "Ready" → "Publish"
   - Merges PR to main branch

### Local Development

Test CMS locally without authentication:

1. **Edit `admin/config.yml`:**
   ```yaml
   # Add at the bottom:
   local_backend: true
   ```

2. **Start local backend:**
   ```bash
   npx @sveltia/cms-proxy
   ```

3. **Start Jekyll:**
   ```bash
   bundle exec jekyll serve --baseurl ""
   ```

4. **Access CMS:**
   - Go to: http://127.0.0.1:4000/admin
   - No authentication required locally

---

## Troubleshooting

### OAuth Issues

**Problem:** "Failed to authenticate with GitHub"

**Solutions:**
1. Check Cloudflare Worker is running: Visit `https://YOUR-WORKER.workers.dev` (should return "OK" or similar)
2. Verify GitHub OAuth callback URL matches Worker URL exactly
3. Check Cloudflare Worker environment variables are set correctly
4. Verify GitHub OAuth app is not suspended

**Problem:** "Redirect URI mismatch"

**Solution:** GitHub callback URL must be: `https://YOUR-WORKER.workers.dev/callback` (exact match)

### PAT Issues

**Problem:** "Token invalid or expired"

**Solutions:**
1. Generate new PAT with correct permissions (Contents: Read and write)
2. Ensure PAT hasn't expired
3. Clear browser local storage and re-authenticate

**Problem:** "Not authorized to access repository"

**Solution:** PAT must have "Contents: Read and write" permission for your repository

### General Issues

**Problem:** CMS page is blank

**Solutions:**
1. Check browser console for errors (F12)
2. Ensure `admin/config.yml` has valid YAML syntax
3. Verify `admin/index.html` loads Sveltia CMS from CDN

**Problem:** "Config file not found"

**Solution:** Ensure `admin/config.yml` exists and is accessible at `/admin/config.yml`

**Problem:** Changes not appearing on site

**Solution:**
1. Check GitHub Actions is running (may take 2-3 minutes)
2. Verify commit was made to `main` branch
3. Check GitHub Pages deployment status

---

## Security Best Practices

1. **Never commit OAuth secrets or PATs to Git**
   - OAuth secrets stay in Cloudflare Workers
   - PATs stay in browser local storage only

2. **Use fine-grained PATs** with minimal permissions
   - Only grant access to your blog repository
   - Set reasonable expiration dates

3. **Rotate tokens regularly**
   - Update OAuth secrets annually
   - Renew PATs every 90 days

4. **Monitor access**
   - Check GitHub repository settings → "OAuth applications" regularly
   - Revoke access for unused applications

5. **HTTPS only**
   - Always access CMS via `https://mattblogsit.com/admin`
   - Never use HTTP for authentication

---

## Cost Summary

| Component | Cost |
|-----------|------|
| **Sveltia CMS** | $0 (open source) |
| **Cloudflare Workers** | $0 (free tier: 100K requests/day) |
| **GitHub Pages** | $0 (free for public repos) |
| **GitHub OAuth** | $0 (free) |
| **GitHub API** | $0 (5,000 requests/hour free) |
| **Total** | **$0/month** |

No credit card required for any service.

---

## Support & Resources

- **Sveltia CMS Documentation:** https://github.com/sveltia/sveltia-cms
- **Sveltia CMS Auth:** https://github.com/sveltia/sveltia-cms-auth
- **GitHub OAuth Docs:** https://docs.github.com/en/apps/oauth-apps
- **Cloudflare Workers Docs:** https://developers.cloudflare.com/workers/

---

## Next Steps

After completing setup:

1. ✅ Test creating a blog post
2. ✅ Test image uploads
3. ✅ Verify post appears on live site
4. ✅ Update CLAUDE.md with CMS instructions for future contributors
5. ✅ (Optional) Enable editorial workflow for drafts

**Congratulations! Your CMS is ready to use.** 🎉
