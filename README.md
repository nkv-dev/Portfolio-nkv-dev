# Nitesh Kumar Verma - Portfolio Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=flat&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

> A modern, responsive, and performant portfolio website showcasing software engineering projects and skills.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
- [Contact](#contact)

## 🎯 Overview

This portfolio website is a single-page application (SPA) built with vanilla web technologies. It demonstrates modern frontend development practices including:

- **Performance-First Architecture**: Optimized for Core Web Vitals
- **Mobile-First Responsive Design**: Works seamlessly across all devices
- **Accessibility Compliance**: WCAG 2.1 AA compliant
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **SEO Optimized**: Semantic HTML and meta tags for search engines

### Key Highlights

- **Zero Dependencies**: Pure HTML5, CSS3, and vanilla JavaScript
- **Static Site**: No build process required, deploy anywhere
- **Modular Codebase**: Clean separation of concerns
- **Production Ready**: Optimized assets and caching strategies

## ✨ Features

### 🎨 Visual Features

- **Dynamic Hero Section**
  - Video background with smooth transitions
  - Typewriter effect with multiple role rotations
  - Gradient text animations
  
- **Interactive About Section**
  - Profile card with hover effects
  - Education overlay panel
  - Interests and skills showcase
  
- **Projects Showcase**
  - Dynamic project loading
  - Advanced bubble physics engine (30+ interactive bubbles)
  - Filter and search capabilities
  
- **Modern Contact Section**
  - Formspree form integration
  - Copy-to-clipboard email functionality
  - Social media links with hover animations
  - Real-time form validation
  
- **Professional Footer**
  - Quick navigation links
  - Social media presence
  - Back-to-top button with smooth scroll

### ⚡ Technical Features

- **Performance Optimizations**
  - Lazy loading for images and videos
  - GPU-accelerated CSS animations
  - Intersection Observer for scroll animations
  - Debounced scroll and resize handlers
  - Optimized asset delivery
  
- **Advanced Interactions**
  - 3D tilt effects on cards
  - Floating particle backgrounds
  - Smooth scrolling navigation
  - Touch-friendly mobile interactions
  - Keyboard navigation support
  
- **Accessibility Features**
  - Semantic HTML5 structure
  - ARIA labels and roles
  - Skip-to-content links
  - Focus management
  - Screen reader compatibility
  - Reduced motion support (`prefers-reduced-motion`)

## 🌐 Demo

**Live Site**: [https://your-portfolio-url.pages.dev](https://your-portfolio-url.pages.dev)

**Screenshot**:
```
[Hero Section Screenshot Placeholder]
```

## 📁 Project Structure

```
Portfolio/
├── 📄 index.html                    # Main HTML entry point
├── 📄 package.json                  # Project metadata and scripts
├── 📄 README.md                     # Project documentation (this file)
├── 📄 CONTRIBUTING.md               # Contribution guidelines
├── 📄 CHANGELOG.md                  # Version history
├── 📄 SECURITY.md                   # Security policy
├── 📄 .gitignore                    # Git ignore patterns
├── 📄 wrangler.toml                 # Cloudflare configuration
├── 📄 CLOUDFLARE.md                 # Cloudflare deployment guide
│
├── 📁 src/                          # Source code
│   ├── 📁 styles/                   # CSS stylesheets
│   │   ├── main.css                # Global styles and variables
│   │   ├── nav.css                 # Navigation styles
│   │   ├── about.css               # About section styles
│   │   ├── achievements.css        # Achievements section styles
│   │   ├── projects.css            # Projects section styles
│   │   ├── contact.css             # Contact section styles
│   │   └── footer.css              # Footer section styles
│   │
│   └── 📁 scripts/                  # JavaScript modules
│       ├── main.js                 # Core: Typewriter, video background
│       ├── nav.js                  # Navigation: Active states, mobile menu
│       ├── about.js                # About: Education/interest panels
│       ├── projects.js             # Projects: Dynamic loading, filtering
│       ├── bubble-physics.js       # Physics: Interactive bubble system
│       ├── contact.js              # Contact: Form handling, validation
│       ├── footer.js               # Footer: Back-to-top, links
│       ├── performance.js          # Performance: Lazy loading, metrics
│       └── smooth-scroll.js        # Smooth scrolling with Lenis
│
├── 📁 assets/                       # Static assets
│   ├── 📁 images/                   # Image assets
│   │   └── avatar.jpg              # Profile picture
│   │
│   └── 📁 videos/                   # Background videos
│       ├── pc.mp4                  # Hero video 1
│       ├── eletronics.mp4          # Hero video 2
│       ├── drifting.mp4            # Hero video 3
│       ├── coding_website.mp4      # Hero video 4
│       └── army.mp4                # Hero video 5
│
└── 📁 docs/                         # Documentation
    ├── ARCHITECTURE.md             # System architecture
    ├── COMPONENTS.md               # Component documentation
    ├── DEPLOYMENT.md               # Deployment guides
    ├── DEVELOPMENT.md              # Development guide
    ├── PERFORMANCE.md              # Performance optimization
    └── TROUBLESHOOTING.md          # Common issues
```

## 🛠️ Technologies Used

### Core Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| HTML5 | Structure and semantics | Living Standard |
| CSS3 | Styling and animations | Level 3 |
| JavaScript (ES6+) | Interactivity and logic | ES2022 |

### External Libraries (CDN)

| Library | Purpose | Version |
|---------|---------|---------|
| [Bootstrap 5](https://getbootstrap.com/) | CSS framework, icons | 5.3.8 |
| [Lenis](https://github.com/darkroomengineering/lenis) | Smooth scrolling | 1.1.18 |
| [Devicon](https://devicon.dev/) | Technology icons | Latest |

### Third-Party Services

| Service | Purpose |
|---------|---------|
| [Formspree](https://formspree.io/) | Contact form handling |
| [Cloudflare Pages](https://pages.cloudflare.com/) | Hosting and CDN |

### Development Tools

- **Version Control**: Git
- **Code Editor**: VS Code (recommended)
- **Local Server**: Python HTTP Server
- **Browser DevTools**: Chrome/Firefox DevTools

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- [Git](https://git-scm.com/) installed
- [Python 3](https://www.python.org/) (for local server)
- Text editor or IDE (VS Code recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nitesh-kumar-verma/portfolio.git
   cd portfolio
   ```

2. **Start local development server**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Node.js (if installed)
   npx serve
   
   # Or using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Quick Start Checklist

- [ ] Clone repository
- [ ] Update contact information in HTML
- [ ] Replace avatar image
- [ ] Update social links
- [ ] Configure Formspree endpoint
- [ ] Test locally
- [ ] Deploy to hosting

## 💻 Development

### File Organization Principles

1. **Separation of Concerns**: HTML (structure), CSS (presentation), JS (behavior)
2. **Modular Architecture**: Each section has its own CSS and JS file
3. **Progressive Enhancement**: Core functionality works without JS
4. **Performance Budget**: Keep total page size under 2MB

### Code Standards

#### HTML
- Use semantic elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- Include `alt` attributes for all images
- Maintain proper heading hierarchy (h1 → h2 → h3)
- Use ARIA labels for interactive elements

#### CSS
- Use CSS custom properties (variables) for theming
- Follow BEM naming convention for classes
- Mobile-first responsive design approach
- Minimize specificity conflicts

#### JavaScript
- Use ES6+ features (const/let, arrow functions, async/await)
- Modular code organization
- Event delegation for dynamic elements
- Debounce/throttle performance-critical functions

### Development Workflow

1. Make changes to source files
2. Test in browser with local server
3. Check browser console for errors
4. Test responsiveness (Chrome DevTools)
5. Test accessibility (axe DevTools)
6. Commit changes with descriptive messages

### Customization Guide

#### Update Personal Information

Edit the following in `index.html`:

```html
<!-- Hero Section - Line 69-75 -->
<h1 class="fw-bold mb-3">
  Hi, <span class="text-warning">Your Name</span> here
</h1>

<!-- Contact Section - Update email addresses -->
<span class="email-address" id="contactEmail">your.email@example.com</span>

<!-- Social Links - Update URLs -->
<a href="https://github.com/yourusername" target="_blank">...</a>
```

#### Customize Color Scheme

Edit `src/styles/main.css`:

```css
:root {
  --tech-primary: #ef4444;      /* Primary accent color */
  --tech-secondary: #dc2626;    /* Secondary accent */
  --tech-glow: rgba(239, 68, 68, 0.3);  /* Glow effects */
  /* Add more custom properties */
}
```

#### Update Typing Effect Words

Edit `src/scripts/main.js`:

```javascript
const words = [
  "Software Engineer",
  "Web Developer",
  "Your Title",
  "Add More"
];
```

## 🚀 Deployment

### Supported Platforms

This portfolio is optimized for static hosting:

- ✅ **Cloudflare Pages** (Recommended)
- ✅ **GitHub Pages**
- ✅ **Netlify**
- ✅ **Vercel**
- ✅ **AWS S3 + CloudFront**
- ✅ **Any static web server**

### Cloudflare Pages Deployment (Recommended)

1. **Connect repository**
   - Push code to GitHub
   - Connect repo in Cloudflare Pages dashboard

2. **Build settings**
   - Build command: *(leave empty)*
   - Build output directory: `.` (root)

3. **Deploy**
   - Automatic deployments on git push
   - Custom domain support available

See [CLOUDFLARE.md](CLOUDFLARE.md) for detailed instructions.

### GitHub Pages Deployment

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / `root`
4. Your site will be at `https://username.github.io/portfolio`

### Performance Checklist Before Deployment

- [ ] Optimize images (use WebP format)
- [ ] Compress videos or use CDN
- [ ] Enable gzip/brotli compression
- [ ] Set proper cache headers
- [ ] Test Core Web Vitals
- [ ] Verify all links work
- [ ] Test on mobile devices
- [ ] Check accessibility score (Lighthouse)

## ⚡ Performance

### Optimization Strategies

#### Loading Performance
- **Lazy Loading**: Images load as they enter viewport
- **Preload Critical Resources**: CSS and first video
- **Defer Non-Critical JS**: Scripts load after page render
- **Resource Hints**: `preload`, `prefetch` directives

#### Runtime Performance
- **GPU Acceleration**: CSS transforms use GPU
- **Intersection Observer**: Efficient scroll detection
- **Debounced Events**: Scroll/resize handlers optimized
- **Will-Change**: Strategic use for animations

#### Asset Optimization
- **Video Optimization**: Multiple formats, poster images
- **Image Optimization**: Compressed JPG/PNG
- **CSS Optimization**: Minified for production
- **JS Optimization**: Modular loading

### Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint (FCP) | < 1.8s | - |
| Largest Contentful Paint (LCP) | < 2.5s | - |
| Time to Interactive (TTI) | < 3.8s | - |
| Cumulative Layout Shift (CLS) | < 0.1 | - |
| Total Page Size | < 2MB | ~15MB (videos) |

**Note**: Large video files impact metrics. Consider using a CDN or lazy-loading videos.

### Core Web Vitals Monitoring

The site includes performance monitoring in `src/scripts/performance.js`:

```javascript
// Metrics are logged to console in development
// In production, integrate with analytics
```

## ♿ Accessibility

### Standards Compliance

This portfolio follows **WCAG 2.1 Level AA** guidelines:

- **Perceivable**: Content available to all senses
- **Operable**: Interface works with keyboard/assistive tech
- **Understandable**: Information and UI are clear
- **Robust**: Works with current and future technologies

### Accessibility Features

#### Navigation
- Skip-to-content link for screen readers
- Keyboard-navigable menu
- Focus indicators on interactive elements
- Logical tab order

#### Content
- Semantic HTML structure
- ARIA labels for icons and buttons
- Alt text for all images
- Sufficient color contrast (4.5:1 minimum)

#### Interactive Elements
- Form labels associated with inputs
- Error messages announced to screen readers
- Loading states communicated
- Reduced motion support

### Testing Accessibility

Use these tools to verify:

1. **Lighthouse** (Chrome DevTools)
2. **axe DevTools** (browser extension)
3. **WAVE** (web accessibility evaluation tool)
4. **Screen Readers**: NVDA (Windows), VoiceOver (Mac)

### Accessibility Statement

> This portfolio is committed to being accessible to all users. If you encounter any accessibility barriers, please contact me at [your-email@example.com].

## 🌐 Browser Support

### Supported Browsers

| Browser | Minimum Version | Support Level |
|---------|----------------|---------------|
| Chrome | 80+ | Full support |
| Firefox | 75+ | Full support |
| Safari | 13+ | Full support |
| Edge | 80+ | Full support |
| Opera | 67+ | Full support |
| Chrome Mobile | 80+ | Full support |
| Safari iOS | 13+ | Full support |
| Samsung Internet | 12+ | Full support |

### Progressive Enhancement

- **Modern browsers**: Full animations and interactions
- **Older browsers**: Graceful degradation
- **No JavaScript**: Content still accessible
- **Reduced motion**: Respects user preferences

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code of conduct
- How to submit issues
- How to propose changes
- Development setup
- Testing requirements

### Ways to Contribute

1. **Bug Reports**: Found an issue? [Open an issue](../../issues)
2. **Feature Requests**: Have an idea? [Suggest it](../../issues)
3. **Code Contributions**: Submit a [Pull Request](../../pulls)
4. **Documentation**: Improve docs and README
5. **Translations**: Translate to other languages

## 🔒 Security

### Security Policy

Please read our [Security Policy](SECURITY.md) for:

- Supported versions
- Reporting vulnerabilities
- Security best practices
- Disclosure policy

### Security Considerations

- **Formspree Integration**: Form submissions are handled securely
- **No User Data Storage**: Site doesn't collect/store user data
- **HTTPS Only**: Enforce HTTPS in production
- **Content Security Policy**: Implement CSP headers
- **Dependency Management**: Minimal external dependencies

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Nitesh Kumar Verma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND...
```

## 📞 Contact

**Nitesh Kumar Verma**

- 📧 Email: [nitesh.kumar@email.com](mailto:nitesh.kumar@email.com)
- 💼 LinkedIn: [linkedin.com/in/niteshkumar](https://linkedin.com/in/niteshkumar)
- 🐙 GitHub: [github.com/niteshdev](https://github.com/niteshdev)
- 🐦 Twitter: [twitter.com/nitesh_dev](https://twitter.com/nitesh_dev)

## 🙏 Acknowledgments

- **Bootstrap Team** for the excellent CSS framework
- **Cloudflare** for hosting and CDN services
- **Formspree** for form handling
- **Open Source Community** for tools and resources

## 🗺️ Roadmap

### Completed ✓
- [x] Hero section with video background
- [x] About section with interactive panels
- [x] Projects showcase with physics engine
- [x] Contact form with Formspree
- [x] Responsive mobile design
- [x] Performance optimizations
- [x] Accessibility compliance

### Planned 📋
- [ ] Dark/Light theme toggle
- [ ] Blog section integration
- [ ] Project filtering by technology
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] PWA (Progressive Web App) features

---

**Built with ❤️ and ☕ by Nitesh Kumar Verma**

⭐ Star this repo if you found it helpful!
