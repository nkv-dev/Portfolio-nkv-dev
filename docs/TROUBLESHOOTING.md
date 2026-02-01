# Troubleshooting Guide

Common issues and their solutions.

## Table of Contents

- [Quick Fixes](#quick-fixes)
- [Development Issues](#development-issues)
- [Deployment Issues](#deployment-issues)
- [Performance Issues](#performance-issues)
- [Browser Issues](#browser-issues)
- [Contact Form Issues](#contact-form-issues)
- [Git Issues](#git-issues)

## Quick Fixes

### Changes Not Showing Up

**Symptom**: Edited files not reflecting in browser

**Solutions**:

1. **Hard Refresh**
   ```
   Windows/Linux: Ctrl + Shift + R
   Mac: Cmd + Shift + R
   ```

2. **Clear Cache**
   ```
   DevTools → Application → Storage → Clear site data
   ```

3. **Disable Cache (DevTools)**
   ```
   DevTools → Network → Check "Disable cache"
   ```

4. **Incognito/Private Mode**
   - Open in incognito window to bypass cache

### Server Won't Start

**Symptom**: `python3 -m http.server 8000` fails

**Solutions**:

1. **Port Already in Use**
   ```bash
   # Find and kill process
   lsof -ti:8000 | xargs kill -9
   
   # Or use different port
   python3 -m http.server 8080
   ```

2. **Python Not Installed**
   ```bash
   # Check Python version
   python3 --version
   
   # Install if missing
   # macOS: brew install python3
   # Ubuntu: sudo apt install python3
   ```

3. **Permission Issues**
   ```bash
   # Check you're in correct directory
   pwd
   ls -la
   
   # Should show index.html
   ```

### 404 Errors

**Symptom**: Files not loading, console shows 404

**Solutions**:

1. **Check File Paths**
   ```html
   <!-- Wrong -->
   <link rel="stylesheet" href="styles.css">
   
   <!-- Correct -->
   <link rel="stylesheet" href="src/styles/main.css">
   ```

2. **Case Sensitivity**
   ```html
   <!-- Linux servers are case-sensitive -->
   <!-- Wrong -->
   <img src="Assets/avatar.jpg">
   
   <!-- Correct -->
   <img src="assets/avatar.jpg">
   ```

3. **Verify Files Exist**
   ```bash
   ls -la src/styles/
   ls -la src/scripts/
   ```

## Development Issues

### JavaScript Not Working

**Symptom**: Interactions don't work, console errors

**Solutions**:

1. **Check Console for Errors**
   ```
   F12 → Console tab
   Look for red error messages
   ```

2. **Verify Script Loading**
   ```html
   <!-- Ensure defer attribute present -->
   <script src="src/scripts/main.js" defer></script>
   ```

3. **Check File Path**
   ```javascript
   // Add to top of script for debugging
   console.log('Script loaded:', window.location.href);
   ```

4. **DOM Not Ready**
   ```javascript
   // Wrap in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
     // Your code here
   });
   ```

### CSS Not Applying

**Symptom**: Styles not showing, elements look wrong

**Solutions**:

1. **Check CSS File Link**
   ```html
   <link rel="stylesheet" href="src/styles/main.css">
   ```

2. **Check Specificity**
   ```css
   /* Add !important temporarily to test */
   .element {
     color: red !important;
   }
   ```

3. **Check DevTools**
   ```
   - Inspect element
   - Check Styles tab
   - Look for crossed-out styles (overridden)
   - Check Computed tab for final values
   ```

4. **Cache Issues**
   - Hard refresh (Ctrl+Shift+R)
   - Check Network tab for 304 responses

### Images Not Loading

**Symptom**: Broken image icons

**Solutions**:

1. **Check Path**
   ```html
   <!-- Relative to index.html -->
   <img src="assets/images/avatar.jpg">
   ```

2. **Check File Exists**
   ```bash
   ls -la assets/images/
   ```

3. **Case Sensitivity**
   ```html
   <!-- Match exact case -->
   <img src="avatar.jpg">  <!-- not Avatar.jpg -->
   ```

4. **File Format**
   ```bash
   # Check actual file extension
   file assets/images/avatar.jpg
   ```

### Videos Not Playing

**Symptom**: Black video area or no video

**Solutions**:

1. **Check Format**
   - Use MP4 (H.264 codec) for best compatibility
   - Avoid AVI, WMV, MKV

2. **Check Attributes**
   ```html
   <video autoplay muted playsinline loop>
     <source src="assets/videos/video.mp4" type="video/mp4">
   </video>
   ```

3. **File Size**
   - Large files (>50MB) may not load
   - Compress: `ffmpeg -i input.mp4 -crf 28 output.mp4`

4. **CORS Issues**
   - Serve from same domain
   - Or configure CORS headers on server

## Deployment Issues

### Site Not Deploying

**Symptom**: Deployment fails or site not live

**Solutions**:

1. **Check Build Settings**
   ```
   Cloudflare/Netlify:
   - Build command: (empty for static)
   - Output directory: . (or ./)
   ```

2. **Check Repository**
   ```bash
   # Ensure main branch has latest code
   git checkout main
   git log --oneline -5
   ```

3. **Check File Permissions**
   ```bash
   # Files should be readable
   chmod -R 644 .
   chmod 755 assets/ src/
   ```

### Custom Domain Not Working

**Symptom**: Domain shows 404 or doesn't load

**Solutions**:

1. **DNS Propagation**
   - Wait 24-48 hours for DNS to propagate
   - Check: `dig yourdomain.com`

2. **DNS Records**
   ```
   Type: A
   Name: @
   Value: [IP from hosting provider]
   TTL: Auto
   ```

3. **CNAME File (GitHub Pages)**
   ```bash
   # Create CNAME file in root
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

4. **HTTPS Issues**
   - Wait for SSL certificate (up to 24 hours)
   - Clear browser cache
   - Try http:// first

### Mixed Content Warnings

**Symptom**: HTTPS page with HTTP resources

**Solution**:
```html
<!-- Change all URLs to HTTPS -->
<!-- Wrong -->
<script src="http://cdn.example.com/script.js"></script>

<!-- Correct -->
<script src="https://cdn.example.com/script.js"></script>

<!-- Or protocol-relative -->
<script src="//cdn.example.com/script.js"></script>
```

## Performance Issues

### Slow Loading

**Symptom**: Page takes > 3 seconds to load

**Solutions**:

1. **Optimize Images**
   ```bash
   # Convert to WebP
   cwebp -q 80 image.jpg -o image.webp
   
   # Compress existing
   imagemin assets/images/* --out-dir=assets/images
   ```

2. **Compress Videos**
   ```bash
   ffmpeg -i input.mp4 -vcodec h264 -crf 28 output.mp4
   ```

3. **Enable Compression**
   - Hosting should enable gzip/brotli
   - Check response headers in DevTools

4. **Lazy Load**
   ```html
   <img data-src="image.jpg" class="lazy" alt="Description">
   ```

### Laggy Animations

**Symptom**: Animations stutter or freeze

**Solutions**:

1. **Reduce Bubbles (Mobile)**
   ```javascript
   // bubble-physics.js
   const bubbleCount = window.innerWidth < 768 ? 8 : 20;
   ```

2. **Disable Complex Effects**
   ```css
   @media (prefers-reduced-motion: reduce) {
     .animated-element {
       animation: none;
       transition: none;
     }
   }
   ```

3. **Check Performance Tab**
   ```
   DevTools → Performance → Record
   Look for long frames (>16ms)
   ```

### High CPU Usage

**Symptom**: Fan spinning, hot laptop, battery drain

**Solutions**:

1. **Pause Bubbles When Hidden**
   ```javascript
   // Already implemented in bubble-physics.js
   // Uses IntersectionObserver
   ```

2. **Reduce Animation Complexity**
   ```css
   /* Simplify animations */
   .simple-animation {
     /* Instead of multiple properties */
     transform: translateX(10px);
     /* Avoid animating: width, height, top, left */
   }
   ```

3. **Use requestAnimationFrame**
   ```javascript
   // Already using this for smooth 60fps
   ```

## Browser Issues

### Works in Chrome, Not in Safari

**Symptom**: Features work in some browsers only

**Solutions**:

1. **Check Browser Support**
   - Check [Can I Use](https://caniuse.com/) for features
   - Add polyfills if needed

2. **Vendor Prefixes**
   ```css
   .element {
     -webkit-transform: translateX(10px);
     -moz-transform: translateX(10px);
     transform: translateX(10px);
   }
   ```

3. **JavaScript Compatibility**
   ```javascript
   // Use older syntax for compatibility
   // Instead of:
   const func = () => {};
   
   // Use:
   var func = function() {};
   ```

### Mobile-Specific Issues

**Symptom**: Works on desktop, broken on mobile

**Solutions**:

1. **Viewport Meta Tag**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **Touch Events**
   ```javascript
   // Use touch events alongside mouse events
   element.addEventListener('touchstart', handler);
   element.addEventListener('mousedown', handler);
   ```

3. **Mobile-First CSS**
   ```css
   /* Mobile styles first */
   .element { width: 100%; }
   
   /* Desktop override */
   @media (min-width: 768px) {
     .element { width: 50%; }
   }
   ```

### iOS Safari Issues

**Symptom**: Specific to iPhone/iPad

**Solutions**:

1. **100vh Issue**
   ```css
   /* iOS Safari handles 100vh differently */
   .full-height {
     height: 100vh;
     height: -webkit-fill-available;
   }
   ```

2. **Fixed Position Issues**
   ```css
   /* Add to body/html */
   html, body {
     -webkit-overflow-scrolling: touch;
   }
   ```

3. **Video Autoplay**
   ```html
   <video autoplay muted playsinline>
   <!-- playsinline is required for iOS -->
   ```

## Contact Form Issues

### Form Not Submitting

**Symptom**: Click submit, nothing happens

**Solutions**:

1. **Check Console**
   ```
   Look for JavaScript errors
   Check Network tab for failed requests
   ```

2. **Verify Formspree Endpoint**
   ```html
   <!-- Check the action URL -->
   <form action="https://formspree.io/f/YOUR_ENDPOINT" method="POST">
   ```

3. **Check Required Fields**
   ```html
   <!-- Ensure all required fields filled -->
   <input type="email" name="email" required>
   ```

4. **CORS Issues**
   ```
   If console shows CORS error:
   - Formspree handles this automatically
   - Check if using correct endpoint
   ```

### Form Submits But No Email

**Symptom**: Success message shows, but no email received

**Solutions**:

1. **Check Spam Folder**
   - Formspree emails sometimes go to spam
   - Add formspree.io to safe senders

2. **Verify Formspree Account**
   - Log in to Formspree dashboard
   - Check form submissions
   - Verify email address

3. **Check Formspree Limits**
   - Free tier: 50 submissions/month
   - Check if limit reached

### Validation Not Working

**Symptom**: Form submits with invalid data

**Solutions**:

1. **HTML5 Validation**
   ```html
   <input type="email" required>
   <input type="text" minlength="2" required>
   ```

2. **JavaScript Validation**
   ```javascript
   // Check contact.js validation logic
   if (!validateEmail(email)) {
     e.preventDefault();
     return false;
   }
   ```

## Git Issues

### Merge Conflicts

**Symptom**: Git refuses to merge, conflict markers in files

**Solution**:
```bash
# 1. See conflicting files
git status

# 2. Open files and look for:
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name

# 3. Edit to keep desired changes, remove markers

# 4. Add and commit
git add .
git commit -m "Resolve merge conflicts"
```

### Push Rejected

**Symptom**: `git push` fails with "rejected"

**Solution**:
```bash
# Pull latest changes first
git pull origin main

# Fix any conflicts
# Then push again
git push origin main
```

### Detached HEAD

**Symptom**: "You are in 'detached HEAD' state"

**Solution**:
```bash
# Create branch from detached state
git checkout -b temp-branch

# Or go back to main
git checkout main
```

### Forgot to Create Branch

**Symptom**: Committed directly to main

**Solution**:
```bash
# If not pushed yet
git checkout -b feature/branch-name
git checkout main
git reset --hard HEAD~1  # Remove commit from main
git checkout feature/branch-name

# If already pushed
# Create revert commit
git revert HEAD
git push origin main
```

## General Debugging

### Enable Debug Mode

Add to any JavaScript file:
```javascript
const DEBUG = true;

if (DEBUG) {
  console.log('Debug info:', variable);
  debugger; // Pauses execution here
}
```

### Network Debugging

```
DevTools → Network tab:
- Check status codes (200 = OK, 404 = Not Found)
- Check response times
- Look for failed requests (red)
- Check file sizes
```

### CSS Debugging

```css
/* Add borders to all elements */
* {
  outline: 1px solid red !important;
}

/* Highlight specific element */
.debug {
  background: rgba(255, 0, 0, 0.3) !important;
  border: 2px solid red !important;
}
```

### JavaScript Debugging

```javascript
// Log variables
console.log('Variable:', myVar);
console.table(myArray);
console.dir(myObject);

// Group logs
console.group('Section');
console.log('Item 1');
console.log('Item 2');
console.groupEnd();

// Time operations
console.time('operation');
// ... code ...
console.timeEnd('operation');

// Add breakpoint
debugger; // Execution pauses here
```

## Getting Help

If issue persists:

1. **Search Issues**: Check GitHub issues (open and closed)
2. **Minimal Reproduction**: Create minimal example showing the issue
3. **Provide Details**:
   - Browser and version
   - Operating system
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots
   - Console error messages

4. **Ask for Help**:
   - Open GitHub Discussion
   - Create detailed issue
   - Email: nitesh.kumar@email.com

---

**Still stuck?** Check [DEVELOPMENT.md](DEVELOPMENT.md) or [ARCHITECTURE.md](ARCHITECTURE.md) for more details.
