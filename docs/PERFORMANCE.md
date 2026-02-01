# Performance Optimization Guide

Strategies and techniques for optimizing portfolio performance.

## Table of Contents

- [Performance Metrics](#performance-metrics)
- [Loading Performance](#loading-performance)
- [Runtime Performance](#runtime-performance)
- [Asset Optimization](#asset-optimization)
- [CSS Optimization](#css-optimization)
- [JavaScript Optimization](#javascript-optimization)
- [Monitoring](#monitoring)
- [Testing](#testing)
- [Checklists](#checklists)

## Performance Metrics

### Core Web Vitals

Google's essential metrics for user experience:

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint - time to render largest element |
| **FID** | < 100ms | First Input Delay - time to respond to first interaction |
| **CLS** | < 0.1 | Cumulative Layout Shift - visual stability |
| **FCP** | < 1.8s | First Contentful Paint - time to render first content |
| **TTFB** | < 600ms | Time to First Byte - server response time |
| **TBT** | < 200ms | Total Blocking Time - main thread blocking |

### Current Portfolio Metrics (Estimated)

| Metric | Desktop | Mobile |
|--------|---------|--------|
| LCP | ~2.0s | ~3.5s |
| FID | ~10ms | ~50ms |
| CLS | ~0.05 | ~0.1 |
| Page Size | ~15MB | ~15MB |

**Note**: Large video files impact metrics significantly.

## Loading Performance

### Resource Loading Strategy

**Current Implementation:**

```html
<!-- 1. Preload Critical CSS -->
<link rel="preload" href="src/styles/main.css" as="style">
<link rel="preload" href="src/styles/nav.css" as="style">

<!-- 2. Load Critical CSS -->
<link rel="stylesheet" href="src/styles/main.css">

<!-- 3. Defer Non-Critical CSS -->
<link rel="stylesheet" href="src/styles/contact.css" media="print" onload="this.media='all'">

<!-- 4. Preconnect to Domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="//cdn.jsdelivr.net">

<!-- 5. Defer JavaScript -->
<script src="src/scripts/main.js" defer></script>
```

**Loading Order:**
1. HTML parser starts
2. Critical CSS loaded (blocking)
3. HTML rendering begins
4. Non-critical CSS loaded (async)
5. Deferred JS loaded after HTML parse
6. DOMContentLoaded event
7. Page interactive

### Lazy Loading

**Images:**

```javascript
// Already implemented in performance.js
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
```

**Usage:**
```html
<img data-src="assets/images/photo.jpg" alt="Description" class="lazy">
```

**Videos:**
```html
<!-- Use poster image -->
<video poster="assets/images/video-poster.jpg" preload="none">
  <source src="assets/videos/video.mp4" type="video/mp4">
</video>
```

### Resource Hints

**Preload** (high priority resources):
```html
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="font.woff2" as="font" crossorigin>
```

**Prefetch** (next page resources):
```html
<link rel="prefetch" href="next-page.html">
```

**Preconnect** (external domains):
```html
<link rel="preconnect" href="https://api.example.com">
```

## Runtime Performance

### Animation Optimization

**Use CSS Transforms:**
```css
/* Good - GPU accelerated */
.animated {
  transform: translateX(100px);
  will-change: transform;
}

/* Avoid - triggers layout */
.bad-animated {
  left: 100px;
  width: 200px;
}
```

**Optimize Properties:**

| Property | Cost | Use For |
|----------|------|---------|
| `transform` | Low | Moving, scaling, rotating |
| `opacity` | Low | Fading |
| `filter` | Medium | Blur, brightness |
| `width/height` | High | Avoid for animations |
| `top/left` | High | Avoid for animations |
| `margin/padding` | High | Avoid for animations |

**Will-Change Strategy:**
```css
/* Add before animation */
.bubble {
  will-change: transform;
}

/* Remove after animation completes */
.bubble.animation-complete {
  will-change: auto;
}
```

### JavaScript Performance

**Event Handling:**

```javascript
// Good - Debounced scroll handler
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage
window.addEventListener('scroll', debounce(handleScroll, 16));

// Good - Throttled mouse move
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
document.addEventListener('mousemove', throttle(handleMouse, 16));
```

**Avoid Layout Thrashing:**

```javascript
// Bad - Causes multiple reflows
const height = element.offsetHeight; // Read
element.style.height = (height * 2) + 'px'; // Write
const width = element.offsetWidth; // Read (triggers reflow!)
element.style.width = (width * 2) + 'px'; // Write

// Good - Batch reads and writes
const height = element.offsetHeight;
const width = element.offsetWidth;
requestAnimationFrame(() => {
  element.style.height = (height * 2) + 'px';
  element.style.width = (width * 2) + 'px';
});
```

**Use requestAnimationFrame:**

```javascript
// For smooth 60fps animations
function animate() {
  // Update positions
  updateBubbles();
  
  // Render
  renderBubbles();
  
  // Continue loop
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

### Memory Management

**Clean Up Event Listeners:**

```javascript
// Add listener
const handler = () => { /* ... */ };
element.addEventListener('click', handler);

// Remove when done
element.removeEventListener('click', handler);
```

**Avoid Memory Leaks:**

```javascript
// Bad - Closures retaining memory
function createHeavyObject() {
  const bigData = new Array(1000000);
  return function() {
    return bigData; // Keeps bigData in memory
  };
}

// Good - Clean up references
function createHeavyObject() {
  const bigData = new Array(1000000);
  return function() {
    const result = bigData.slice(0, 10);
    return result;
  };
}
```

## Asset Optimization

### Image Optimization

**Format Selection:**

| Format | Use Case | Size |
|--------|----------|------|
| WebP | Photos, complex images | Smallest |
| JPEG | Photos (fallback) | Small |
| PNG | Graphics, transparency | Medium |
| SVG | Icons, logos | Variable |

**Convert to WebP:**

```bash
# Using cwebp
brew install webp

# Convert single image
cwebp -q 80 image.jpg -o image.webp

# Batch convert
for file in assets/images/*.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done
```

**Responsive Images:**

```html
<picture>
  <source srcset="image-400.webp 400w,
                  image-800.webp 800w,
                  image-1200.webp 1200w"
          sizes="(max-width: 600px) 400px,
                 (max-width: 1000px) 800px,
                 1200px"
          type="image/webp">
  <img src="image-800.jpg" alt="Description">
</picture>
```

**Compression Tools:**

```bash
# Install imagemin
npm install -g imagemin-cli

# Optimize images
imagemin assets/images/* --out-dir=assets/images --plugin=pngquant --plugin=mozjpeg

# Convert to WebP
imagemin assets/images/* --out-dir=assets/images --plugin=webp
```

### Video Optimization

**Compression:**

```bash
# Using ffmpeg
brew install ffmpeg

# High quality, reasonable size
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -crf 23 output.mp4

# Smaller file (lower quality)
ffmpeg -i input.mp4 -vcodec h264 -crf 28 -preset fast output.mp4

# Very small (mobile)
ffmpeg -i input.mp4 -vcodec h264 -crf 32 -vf scale=1280:720 output.mp4
```

**CRF Values:**
- 18-23: High quality (larger file)
- 23-28: Good quality (recommended)
- 28-35: Acceptable quality (smaller file)

**Video Delivery:**

```html
<!-- Multiple formats -->
<video autoplay muted loop playsinline>
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
</video>
```

### Font Optimization

**Load Only Needed Weights:**

```html
<!-- Load specific weights -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

<!-- Not all weights -->
<!-- Avoid: wght@100;200;300;400;500;600;700;800;900 -->
```

**Font Display:**

```css
/* Use font-display: swap */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* Show fallback while loading */
}
```

**Preload Critical Fonts:**

```html
<link rel="preload" href="fonts/main-font.woff2" as="font" type="font/woff2" crossorigin>
```

## CSS Optimization

### Critical CSS

**Extract Critical CSS:**

```bash
# Using Critical
npm install -g critical

critical index.html --base . --width 1920 --height 1080 --minify --inline > dist/index.html
```

**Manual Critical CSS:**

```html
<style>
  /* Inline critical CSS */
  /* Header, hero section only */
</style>

<link rel="preload" href="main.css" as="style" onload="this.rel='stylesheet'">
```

### Unused CSS Removal

**Using PurgeCSS:**

```bash
npm install -g purgecss

purgecss --css src/styles/*.css --content index.html --output dist/styles/
```

### CSS Containment

```css
/* Isolate rendering */
.section {
  contain: layout style paint;
}

/* Strict containment (most optimized) */
.bubble-container {
  contain: strict;
}
```

## JavaScript Optimization

### Code Splitting

**Dynamic Imports:**

```javascript
// Load heavy module only when needed
async function loadHeavyFeature() {
  const module = await import('./heavy-module.js');
  module.init();
}

// Trigger on user interaction
document.getElementById('button').addEventListener('click', loadHeavyFeature);
```

### Tree Shaking

**Remove Unused Code:**

```javascript
// If using build tools
// Only import what you need
import { specificFunction } from 'library';
// Not: import * as library from 'library';
```

### Minification

```bash
# CSS minification
cleancss -o dist/styles/ src/styles/

# JS minification
terser -o dist/scripts/ src/scripts/

# HTML minification
html-minifier --input-dir . --output-dir dist --collapse-whitespace --remove-comments
```

## Monitoring

### Performance Observer

```javascript
// Monitor Core Web Vitals
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('LCP:', entry.renderTime || entry.loadTime);
    
    // Send to analytics
    gtag('event', 'web_vitals', {
      event_category: 'LCP',
      value: Math.round(entry.renderTime || entry.loadTime),
    });
  }
}).observe({ entryTypes: ['largest-contentful-paint'] });

// Monitor layout shifts
let clsValue = 0;
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  }
  console.log('CLS:', clsValue);
}).observe({ entryTypes: ['layout-shift'] });
```

### Resource Loading Monitoring

```javascript
// Monitor resource load times
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.initiatorType === 'img' || entry.initiatorType === 'video') {
      console.log(`${entry.name}: ${entry.duration}ms`);
    }
  }
}).observe({ entryTypes: ['resource'] });
```

### Error Monitoring

```javascript
// Catch global errors
window.addEventListener('error', (event) => {
  console.error('Error:', event.message);
  // Send to error tracking service
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise rejection:', event.reason);
});
```

## Testing

### Lighthouse

**Run Audit:**
```
Chrome DevTools → Lighthouse tab
Categories: Performance, Accessibility, Best Practices, SEO
Device: Mobile (stricter)
Run audit
```

**Target Scores:**
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### WebPageTest

**Test from multiple locations:**
```
https://www.webpagetest.org/
- Test from different countries
- Test on 3G, 4G, Cable
- Check waterfall chart
- Review filmstrip view
```

### PageSpeed Insights

```
https://pagespeed.web.dev/
- Enter your URL
- Get mobile and desktop scores
- Follow optimization suggestions
```

### Chrome DevTools

**Performance Tab:**
```
1. Click record
2. Perform actions
3. Stop recording
4. Analyze:
   - FPS (aim for 60)
   - CPU usage
   - Network requests
   - Long tasks
```

**Network Tab:**
```
- Check file sizes
- Check load times
- Look for large resources
- Check caching headers
```

## Checklists

### Pre-Deployment

- [ ] Images optimized (WebP format)
- [ ] Videos compressed
- [ ] CSS minified
- [ ] JavaScript minified (if using build process)
- [ ] Lazy loading enabled
- [ ] Resource hints added
- [ ] Gzip/Brotli compression enabled
- [ ] Caching headers configured
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] Accessibility score 100

### Post-Deployment

- [ ] Site loads in < 3 seconds
- [ ] All videos play correctly
- [ ] Animations are smooth (60fps)
- [ ] No layout shifts during load
- [ ] Mobile experience is good
- [ ] Analytics tracking working
- [ ] Form submissions working
- [ ] Social links correct
- [ ] SEO meta tags present

### Ongoing Monitoring

- [ ] Weekly Lighthouse checks
- [ ] Monthly WebPageTest
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Track real user metrics (RUM)
- [ ] Review error logs
- [ ] Check Core Web Vitals report in Google Search Console

## Performance Budget

### Recommended Limits

| Resource | Budget | Current |
|----------|--------|---------|
| Total Page Weight | < 2MB | ~15MB (videos) |
| Images | < 500KB | - |
| JavaScript | < 300KB | ~50KB |
| CSS | < 100KB | ~30KB |
| Fonts | < 100KB | ~50KB |
| HTTP Requests | < 50 | ~30 |

**Note**: Videos are the largest assets. Consider:
- Using video CDN
- Lazy loading videos
- Reducing video count
- Compressing more aggressively

## Advanced Optimizations

### Service Worker

```javascript
// Register service worker for caching
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/src/styles/main.css',
  '/src/scripts/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

### HTTP/2 Server Push

```apache
# .htaccess
<IfModule http2_module>
  Header add Link "</src/styles/main.css>; rel=preload; as=style" env=REDIRECT_URL
</IfModule>
```

### CDN Configuration

**Cloudflare Optimizations:**
- Enable Auto Minify (HTML, CSS, JS)
- Enable Brotli compression
- Set browser cache TTL to 1 year for static assets
- Enable Rocket Loader (optional)
- Enable Mirage (image optimization)

---

**For more details:** Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design.
