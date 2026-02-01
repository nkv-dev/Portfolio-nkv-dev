# Deployment Guide

This guide covers deploying your portfolio to various hosting platforms.

## Table of Contents

- [Quick Start](#quick-start)
- [Cloudflare Pages (Recommended)](#cloudflare-pages-recommended)
- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Other Static Hosts](#other-static-hosts)
- [Custom Domain Setup](#custom-domain-setup)
- [SSL/HTTPS](#sslhttps)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Troubleshooting](#troubleshooting)

## Quick Start

For **Cloudflare Pages** (recommended):

1. Push code to GitHub
2. Connect repo in Cloudflare Pages dashboard
3. Build settings: Leave defaults
4. Deploy 🚀

## Cloudflare Pages (Recommended)

### Why Cloudflare Pages?

- ✅ **Free SSL certificates**
- ✅ **Global CDN** (200+ locations)
- ✅ **Unlimited bandwidth**
- ✅ **Automatic deployments**
- ✅ **Branch previews**
- ✅ **Custom domains**
- ✅ **Integration with Cloudflare ecosystem**

### Setup Steps

#### 1. Push to GitHub

```bash
# If not already done
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
```

#### 2. Sign Up

- Go to [Cloudflare Pages](https://pages.cloudflare.com/)
- Sign up for a free Cloudflare account
- Verify email

#### 3. Create Project

1. Click "Create a project"
2. Select "Connect to Git"
3. Authorize Cloudflare to access your GitHub
4. Select your portfolio repository

#### 4. Configure Build

**Build Settings:**
```
Project name: portfolio (or your choice)
Production branch: main
Framework preset: None
Build command: (leave empty)
Build output directory: . (just a period, meaning root)
Root directory: (leave empty)
```

**Environment Variables:**
```
None needed for static sites
```

#### 5. Deploy

Click "Save and Deploy"

Your site will be live at: `https://portfolio.pages.dev`

### Build Configuration File

Create `wrangler.toml` in root:

```toml
name = "portfolio"
compatibility_date = "2024-02-01"

[site]
bucket = "."
```

### Custom Domain (Cloudflare)

1. Go to Pages dashboard → Your project → Custom domains
2. Click "Set up a custom domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Follow DNS setup instructions
5. Wait for SSL certificate provisioning (automatic)

### Branch Previews

Cloudflare automatically creates preview deployments for branches:

```bash
# Push a new branch
git checkout -b feature/new-section
git push origin feature/new-section

# Cloudflare will deploy to:
# https://feature-new-section.portfolio.pages.dev
```

## GitHub Pages

### Setup

1. Go to repository Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: Select `main` / root
4. Click Save

Your site will be at: `https://username.github.io/portfolio`

### Custom Domain (GitHub Pages)

1. In Pages settings, add custom domain
2. Create `CNAME` file in repo root:
   ```
   yourdomain.com
   ```
3. Configure DNS (see Custom Domain section)
4. Enable HTTPS (GitHub will provision certificate)

### Limitations

- 1GB repository size limit
- 100GB monthly bandwidth
- No server-side processing
- 10 builds per hour limit

## Netlify

### Drag & Drop Deploy

1. Go to [Netlify](https://netlify.com)
2. Drag your project folder to deploy area
3. Site is live instantly

### Git Integration

1. Click "New site from Git"
2. Connect to GitHub
3. Select repository
4. Build settings:
   ```
   Build command: (leave empty)
   Publish directory: .
   ```
5. Click "Deploy site"

### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

## Vercel

### Setup

1. Go to [Vercel](https://vercel.com)
2. Import Git repository
3. Framework preset: Other
4. Build command: (leave empty)
5. Output directory: .
6. Deploy

### Vercel Configuration

Create `vercel.json`:

```json
{
  "version": 2,
  "public": true,
  "github": {
    "enabled": true
  }
}
```

## Other Static Hosts

### AWS S3 + CloudFront

```bash
# Install AWS CLI
pip install awscli

# Configure credentials
aws configure

# Create S3 bucket
aws s3 mb s3://your-portfolio-bucket

# Enable static website hosting
aws s3 website s3://your-portfolio-bucket --index-document index.html

# Upload files
aws s3 sync . s3://your-portfolio-bucket --exclude ".git/*" --exclude "node_modules/*"

# Set bucket policy for public access (create policy.json)
aws s3api put-bucket-policy --bucket your-portfolio-bucket --policy file://policy.json
```

**policy.json:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-portfolio-bucket/*"
    }
  ]
}
```

### Surge.sh

```bash
# Install Surge
npm install -g surge

# Deploy
cd portfolio
surge

# Follow prompts
# Domain: your-portfolio.surge.sh
```

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

**firebase.json:**
```json
{
  "hosting": {
    "public": ".",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

## Custom Domain Setup

### DNS Configuration

#### Option 1: A Record (Root Domain)

For `yourdomain.com`:

**Cloudflare Pages:**
```
Type: A
Name: @
Value: 192.0.2.1  (Cloudflare will provide actual IP)
TTL: Auto
```

**GitHub Pages:**
```
Type: A
Name: @
Value: 
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
```

#### Option 2: CNAME (Subdomain)

For `www.yourdomain.com`:

```
Type: CNAME
Name: www
Value: 
  - Cloudflare: your-project.pages.dev
  - GitHub: username.github.io
  - Netlify: your-site.netlify.app
TTL: Auto
```

### Domain Registrar Instructions

#### Cloudflare Registrar

1. Add domain to Cloudflare
2. Update nameservers at registrar
3. Wait for DNS propagation (24-48 hours)
4. Add custom domain in Pages settings

#### GoDaddy

1. Log in to GoDaddy
2. Go to DNS Management
3. Add A or CNAME records
4. Save changes

#### Namecheap

1. Log in to Namecheap
2. Go to Domain List → Manage
3. Advanced DNS tab
4. Add A or CNAME records
5. Save changes

#### Google Domains

1. Log in to Google Domains
2. Select domain → DNS
3. Custom resource records
4. Add A or CNAME records
5. Save

### SSL/HTTPS

All modern hosting platforms provide **free SSL certificates**:

- **Automatic provisioning** (no action needed)
- **Auto-renewal** (usually 90-day certs)
- **HTTPS enforcement** (can be configured)

**Force HTTPS** (add to your platform's config):

**Cloudflare:**
```toml
# In dashboard: SSL/TLS → Edge Certificates → Always Use HTTPS: ON
```

**Netlify:**
```toml
# netlify.toml
[[redirects]]
  from = "http://*"
  to = "https://*:splat"
  status = 301
  force = true
```

## Post-Deployment Checklist

### Functionality

- [ ] All pages load correctly
- [ ] Navigation works smoothly
- [ ] Contact form submits successfully
- [ ] Email copy-to-clipboard works
- [ ] Social media links are correct
- [ ] Video backgrounds load
- [ ] Images display properly
- [ ] Interactive elements (bubbles) work

### Responsive Design

- [ ] Test on mobile (320px - 480px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (1024px+)
- [ ] No horizontal scrolling
- [ ] Text is readable on all sizes

### Performance

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] No console errors
- [ ] Fast load time (< 3s)

### Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast sufficient
- [ ] Alt text on images
- [ ] Focus indicators visible

### SEO

- [ ] Meta tags present
- [ ] Open Graph tags
- [ ] Sitemap submitted (optional)
- [ ] robots.txt configured
- [ ] Google Search Console connected (optional)

### Security

- [ ] HTTPS working
- [ ] No mixed content warnings
- [ ] CSP headers configured (optional)
- [ ] Security headers present
- [ ] No sensitive data exposed

### Analytics (Optional)

- [ ] Google Analytics connected
- [ ] Form submissions tracked
- [ ] User interactions measured
- [ ] Performance metrics collected

## Continuous Deployment

### Automated Deployments

All Git-based hosts support automatic deployments:

```bash
# 1. Make changes locally
git checkout -b feature/update
# ... edit files ...

# 2. Commit and push
git add .
git commit -m "feat: Update hero section"
git push origin feature/update

# 3. Create Pull Request
# 4. Merge to main
# 5. Site automatically redeploys
```

### Branch Previews

Test changes before merging:

**Cloudflare:**
- Every branch gets a preview URL
- Format: `https://branch-name.project.pages.dev`

**Netlify:**
- Deploy previews for PRs
- Comment on PR with preview URL

**Vercel:**
- Preview deployments for every push
- Unique URL for each deployment

## Environment-Specific Configurations

### Development vs Production

**Development (localhost):**
```javascript
// Use test API endpoints
const API_URL = 'http://localhost:8000/api';
```

**Production:**
```javascript
// Use production endpoints
const API_URL = 'https://api.yourdomain.com';
```

### Environment Variables

For static sites, use build-time configs:

```javascript
// config.js
const config = {
  formspreeEndpoint: 'https://formspree.io/f/YOUR_ENDPOINT',
  googleAnalyticsId: 'GA_MEASUREMENT_ID',
};
```

## Rollback Strategy

### Via Git

```bash
# Revert last commit
git revert HEAD
git push

# Or reset to previous commit
git reset --hard HEAD~1
git push --force
```

### Via Hosting Dashboard

**Cloudflare:**
1. Go to Pages dashboard
2. Select project
3. View deployment history
4. Click "Rollback" on desired version

**Netlify:**
1. Go to Site overview
2. Deploys tab
3. Find previous deploy
4. Click "Publish deploy"

## Troubleshooting

### 404 Errors

**Problem**: Page not found

**Solutions:**
1. Check file paths are correct
2. Verify case sensitivity (`File.html` vs `file.html`)
3. Check if `.html` extension needed in URLs
4. Configure redirects/rewrites

**Cloudflare:**
```toml
[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

**Netlify:**
```toml
[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

### Mixed Content Warnings

**Problem**: HTTP resources on HTTPS page

**Solution:**
```html
<!-- Change this -->
<script src="http://example.com/script.js"></script>

<!-- To this -->
<script src="https://example.com/script.js"></script>

<!-- Or protocol-relative -->
<script src="//example.com/script.js"></script>
```

### Form Not Working

**Problem**: Form submissions failing

**Check:**
1. Formspree endpoint URL correct
2. Form action attribute correct
3. All required fields filled
4. CORS not blocking (check console)

### Slow Loading

**Problem**: Site loads slowly

**Optimizations:**
1. Compress images (WebP format)
2. Compress videos
3. Enable gzip/brotli compression
4. Use CDN (already included with hosts)
5. Lazy load images/videos
6. Minify CSS/JS (optional)

### Custom Domain Not Working

**Troubleshooting:**
1. Check DNS records propagated (use `dig` or `nslookup`)
2. Verify SSL certificate issued (may take 24 hours)
3. Check for conflicting DNS records
4. Clear browser cache
5. Try incognito/private mode

```bash
# Check DNS propagation
dig +short yourdomain.com

# Check CNAME
dig +short www.yourdomain.com
```

### Build Failures

**Common causes:**
1. Missing build command (not needed for static)
2. Wrong output directory
3. Git authentication issues
4. Large files exceeding limits

**Solution:**
- Ensure build settings are empty for static sites
- Check file size limits (usually 100MB per file)
- Verify Git permissions

## Performance Optimization

### Before Deployment

1. **Optimize Images:**
   ```bash
   # Convert to WebP
   cwebp -q 80 image.jpg -o image.webp
   
   # Compress
   imagemin assets/images/* --out-dir=assets/images
   ```

2. **Compress Videos:**
   ```bash
   ffmpeg -i input.mp4 -vcodec h264 -crf 28 output.mp4
   ```

3. **Minify Assets:**
   ```bash
   # CSS
   cleancss -o dist/styles/ src/styles/
   
   # JS
   terser -o dist/scripts/ src/scripts/
   ```

### CDN Optimization

**Cloudflare:**
- Enable Auto Minify (CSS, JS, HTML)
- Enable Brotli compression
- Set browser cache TTL
- Enable Rocket Loader (optional)

## Monitoring

### Uptime Monitoring

**Free Options:**
- UptimeRobot (free tier: 50 monitors)
- Pingdom (free tier available)
- StatusCake (free tier available)

### Analytics

**Google Analytics:**
```javascript
<!-- Add to head -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Next Steps

After deployment:

1. **Share your portfolio:**
   - LinkedIn
   - Twitter
   - GitHub profile
   - Resume

2. **Monitor performance:**
   - Google Search Console
   - Analytics
   - Uptime monitoring

3. **Keep updated:**
   - Update content regularly
   - Add new projects
   - Update skills/achievements

---

**Need help?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or open an issue.
