# Development Guide

## Quick Start

### Prerequisites

Ensure you have the following installed:

- **Git** (v2.20+) - [Download](https://git-scm.com/)
- **Python 3** (v3.6+) - [Download](https://www.python.org/)
- **Modern Browser** - Chrome, Firefox, Safari, or Edge
- **Code Editor** - VS Code recommended with extensions:
  - Live Server
  - Prettier
  - ESLint
  - Auto Rename Tag

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nitesh-kumar-verma/portfolio.git
   cd portfolio
   ```

2. **Start development server**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## Development Workflow

### Daily Development Cycle

```bash
# 1. Start fresh
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make changes
# ... edit files ...

# 4. Test locally
# - Check browser at http://localhost:8000
# - Test responsive design
# - Check console for errors

# 5. Commit changes
git add .
git commit -m "feat: Add new feature"

# 6. Push branch
git push origin feature/my-feature

# 7. Create Pull Request on GitHub
```

### File Editing Guidelines

#### HTML Editing

```html
<!-- Use semantic elements -->
<main>
  <section id="hero">
    <h1>Title</h1>
    <p>Content</p>
  </section>
</main>

<!-- Add ARIA labels -->
<button aria-label="Close menu">×</button>

<!-- Include alt text -->
<img src="photo.jpg" alt="Description of image">
```

#### CSS Editing

```css
/* Use CSS variables for theming */
:root {
  --primary-color: #ef4444;
}

/* Mobile-first approach */
.component {
  /* Mobile styles first */
  padding: 10px;
}

@media (min-width: 768px) {
  .component {
    /* Desktop styles */
    padding: 20px;
  }
}

/* Comment complex sections */
/***************************
 * ANIMATION SECTION
 ***************************/
```

#### JavaScript Editing

```javascript
// Use modern ES6+ syntax
const API_URL = 'https://api.example.com';

// Async/await for async operations
async function fetchData() {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Modular organization
/***************************
 * MODULE NAME
 ***************************/
function initModule() {
  // Implementation
}
```

## Debugging

### Browser DevTools

**Chrome/Firefox DevTools shortcuts:**
- `F12` or `Cmd+Opt+I` (Mac) / `Ctrl+Shift+I` (Win) - Open DevTools
- `Cmd+Opt+J` / `Ctrl+Shift+J` - Open Console
- `Cmd+Shift+C` / `Ctrl+Shift+C` - Inspect element

### Common Debugging Tasks

#### 1. Check Console for Errors

```javascript
// Look for:
// - Red error messages
// - Warning messages
// - Failed network requests
```

#### 2. Inspect Network Requests

```
DevTools → Network tab
- Check if files are loading (200 status)
- Check file sizes
- Check loading times
```

#### 3. Test Responsive Design

```
DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
- Test different screen sizes
- Test touch interactions
- Check mobile layout
```

#### 4. Debug CSS

```css
/* Add temporary borders */
* {
  outline: 1px solid red !important;
}

/* Check element sizing */
.element {
  background: rgba(255, 0, 0, 0.3) !important;
}
```

#### 5. Debug JavaScript

```javascript
// Add breakpoints
function myFunction() {
  debugger; // Execution will pause here
  console.log('Debug point');
}

// Log variables
console.log('Variable:', variable);
console.table(array); // For arrays
console.dir(object);  // For objects
```

### Debugging Checklist

- [ ] Check browser console for errors
- [ ] Verify file paths are correct
- [ ] Check if all resources load (Network tab)
- [ ] Test in incognito/private mode (no cache)
- [ ] Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- [ ] Check different browsers
- [ ] Test on mobile device or emulator

## Testing

### Manual Testing

#### Functional Testing

1. **Navigation**
   - All links work
   - Smooth scrolling works
   - Active section updates correctly
   - Mobile menu toggles

2. **Forms**
   - Validation works
   - Error messages display
   - Success message shows
   - Form submits to Formspree

3. **Interactive Elements**
   - Bubbles react to mouse
   - Cards have hover effects
   - Buttons are clickable
   - Copy-to-clipboard works

#### Responsive Testing

```bash
# Test at these breakpoints
320px   - Mobile small
375px   - Mobile medium
768px   - Tablet
1024px  - Desktop small
1440px  - Desktop large
1920px  - Desktop extra large
```

#### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

### Performance Testing

#### Lighthouse Audit

```
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select categories: Performance, Accessibility, SEO
4. Click "Analyze page load"
5. Review scores and recommendations
```

**Target Scores:**
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

#### Core Web Vitals

Check these metrics:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Accessibility Testing

#### Automated Testing

1. **axe DevTools** (Chrome extension)
   - Install extension
   - Run scan on page
   - Fix reported issues

2. **Lighthouse** Accessibility audit

3. **WAVE** (Web Accessibility Evaluation Tool)
   - Go to https://wave.webaim.org/
   - Enter your URL
   - Review results

#### Manual Testing

- [ ] Navigate with Tab key only
- [ ] Check focus indicators visible
- [ ] Test with screen reader (NVDA, VoiceOver)
- [ ] Check color contrast ratios
- [ ] Verify alt text on images
- [ ] Test reduced motion preference

## Code Quality

### Linting

#### HTML

Use [HTML Validator](https://validator.w3.org/):
```bash
# Validate HTML
curl -H "Content-Type: text/html; charset=utf-8" \
  --data-binary @index.html \
  https://validator.w3.org/nu/?out=gnu
```

#### CSS

Use [Stylelint](https://stylelint.io/):
```bash
# Install
npm install -g stylelint stylelint-config-standard

# Create config file
# .stylelintrc.json
{
  "extends": "stylelint-config-standard"
}

# Run
stylelint "src/styles/**/*.css"
```

#### JavaScript

Use [ESLint](https://eslint.org/):
```bash
# Install
npm install -g eslint

# Initialize config
eslint --init

# Run
eslint src/scripts/*.js
```

### Code Formatting

#### VS Code Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

#### Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## Common Tasks

### Adding a New Section

1. **Add HTML to index.html**
   ```html
   <section id="new-section" class="section">
     <div class="container">
       <!-- Content -->
     </div>
   </section>
   ```

2. **Create CSS file**
   ```bash
   touch src/styles/new-section.css
   ```
   ```css
   /* Link in index.html head */
   ```

3. **Create JS file**
   ```bash
   touch src/scripts/new-section.js
   ```
   ```javascript
   // Link in index.html before closing body
   ```

4. **Add to navigation**
   ```html
   <li><a href="#new-section">New Section</a></li>
   ```

### Updating Colors

Edit `src/styles/main.css`:

```css
:root {
  --tech-primary: #ef4444;      /* Change this */
  --tech-secondary: #dc2626;    /* And this */
}
```

### Adding a Project

Edit `src/scripts/projects.js`:

```javascript
const projects = [
  {
    title: "New Project",
    description: "Description here",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/...",
    demo: "https://demo.com"
  }
];
```

### Optimizing Images

```bash
# Install imagemin
npm install -g imagemin-cli

# Optimize all images
imagemin assets/images/* --out-dir=assets/images --plugin=pngquant --plugin=mozjpeg

# Convert to WebP
imagemin assets/images/* --out-dir=assets/images --plugin=webp
```

### Compressing Videos

```bash
# Using ffmpeg
ffmpeg -i input.mp4 -vcodec h264 -acodec mp2 output.mp4

# Reduce quality for smaller size
ffmpeg -i input.mp4 -vcodec h264 -crf 28 -preset fast output.mp4
```

## Troubleshooting

### Common Issues

#### Changes not showing up

**Problem**: Browser showing cached version

**Solution**:
```bash
# Hard refresh
Ctrl + Shift + R  (Windows/Linux)
Cmd + Shift + R   (Mac)

# Or clear cache
DevTools → Application → Clear storage → Clear site data
```

#### Server won't start

**Problem**: Port 8000 already in use

**Solution**:
```bash
# Use different port
python3 -m http.server 8080

# Or kill process using port 8000
lsof -ti:8000 | xargs kill -9
```

#### JavaScript not working

**Problem**: Script not loading or errors

**Solution**:
```javascript
// Check console for errors
// Verify script tag has defer attribute
<script src="src/scripts/file.js" defer></script>

// Check file path is correct
```

#### CSS not applying

**Problem**: Styles not showing

**Solution**:
```css
/* Check specificity */
/* Use !important temporarily to test */
element {
  color: red !important;
}

/* Check if CSS file is loaded in Network tab */
```

#### Form not submitting

**Problem**: Form submission fails

**Solution**:
```javascript
// Check Formspree endpoint is correct
// Check console for errors
// Verify all required fields are filled
// Check network request in DevTools
```

### Getting Help

1. **Check Documentation**
   - README.md
   - docs/ folder
   - Inline code comments

2. **Search Issues**
   - Check existing GitHub issues
   - Search closed issues too

3. **Ask for Help**
   - Open a GitHub Discussion
   - Create an issue with details
   - Include error messages and screenshots

## Best Practices

### Performance

- Minimize HTTP requests
- Optimize images and videos
- Use lazy loading
- Defer non-critical JavaScript
- Minimize CSS specificity

### Accessibility

- Use semantic HTML
- Add alt text to images
- Ensure keyboard navigation
- Test with screen readers
- Check color contrast

### Security

- Never commit secrets
- Validate user input
- Use HTTPS for all resources
- Keep dependencies updated
- Implement CSP headers

### Maintainability

- Comment complex code
- Use consistent naming
- Keep functions small
- Separate concerns
- Write reusable code

## Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [Can I Use](https://caniuse.com/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WAVE](https://wave.webaim.org/)

### Learning
- [JavaScript.info](https://javascript.info/)
- [CSS-Tricks](https://css-tricks.com/)
- [Web.dev Learn](https://web.dev/learn/)

---

**Need more help?** Check the [TROUBLESHOOTING.md](TROUBLESHOOTING.md) guide.
