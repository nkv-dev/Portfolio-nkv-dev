# Nitesh Kumar Verma - Portfolio Website

License: MIT
HTML5 CSS3 JavaScript Astro Cloudflare Pages

A modern, responsive, and performant portfolio website showcasing software engineering projects and skills.

## Table of Contents

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

## Overview

This portfolio website is built with [Astro](https://astro.build/) and deployed on Cloudflare Pages. It demonstrates modern frontend development practices including:

- **Performance-First Architecture**: Optimized for Core Web Vitals
- **Mobile-First Responsive Design**: Works seamlessly across all devices
- **Accessibility Compliance**: WCAG 2.1 AA compliant
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **SEO Optimized**: Semantic HTML and meta tags for search engines

### Key Highlights

- **Component-Based Architecture**: Modular and maintainable code
- **Static Site Generation**: Fast performance with pre-rendered pages
- **View Transitions**: Smooth navigation between pages
- **Minimal Dependencies**: Only essential packages
- **Production Ready**: Optimized assets and caching strategies

## Features

### Visual Features

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

### Technical Features

- **Performance Optimizations**
  - Lazy loading for images
  - GPU-accelerated CSS animations
  - Intersection Observer for scroll animations
  - Optimized asset delivery

- **Advanced Interactions**
  - 3D tilt effects on cards
  - Smooth scrolling navigation
  - Touch-friendly mobile interactions
  - Keyboard navigation support

- **Accessibility Features**
  - Semantic HTML5 structure
  - ARIA labels and roles
  - Skip-to-content links
  - Focus management
  - Screen reader compatibility
  - Reduced motion support (prefers-reduced-motion)

## Demo

Live Site: https://nkv-dev.pages.dev

## Project Structure

```
Portfolio/
├── README.md                     # Project documentation (this file)
├── CHANGELOG.md                  # Version history
├── package.json                  # Project metadata and scripts
├── astro.config.mjs             # Astro configuration
├── tsconfig.json                # TypeScript configuration
├── .gitignore                   # Git ignore patterns
├── .github/                     # GitHub workflows
│
├── src/                         # Source code
│   ├── components/              # Astro components
│   │   ├── Navbar.astro        # Navigation component
│   │   ├── Hero.astro          # Hero section
│   │   ├── About.astro         # About section
│   │   ├── Achievements.astro  # Achievements section
│   │   ├── Projects.astro      # Projects section
│   │   ├── Contact.astro       # Contact section
│   │   └── Footer.astro        # Footer component
│   │
│   ├── layouts/                # Page layouts
│   │   └── Layout.astro        # Main layout
│   │
│   ├── pages/                  # Route pages
│   │   ├── index.astro        # Main page
│   │   ├── projects.astro      # Projects page
│   │   └── contact.astro       # Contact page
│   │
│   ├── styles/                 # Global styles
│   │   └── global.css         # Global CSS
│   │
│   └── content/                # Content collections
│       └── config.ts           # Content configuration
│
├── public/                      # Static assets
│   ├── images/                 # Image assets
│   ├── videos/                 # Background videos
│   └── favicon.svg            # Favicon
│
└── dist/                       # Build output (generated)
```

## Technologies Used

### Core Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| HTML5 | Structure and semantics | Living Standard |
| CSS3 | Styling and animations | Level 3 |
| JavaScript (ES6+) | Interactivity and logic | ES2022 |
| Astro | Static site framework | 5.x |
| TypeScript | Type safety | 5.x |

### External Libraries (CDN/npm)

| Library | Purpose | Version |
|---------|---------|---------|
| Bootstrap 5 | CSS framework, icons | 5.3.8 |
| Lenis | Smooth scrolling | 1.1.18 |
| Devicon | Technology icons | Latest |

### Third-Party Services

| Service | Purpose |
|---------|---------|
| Formspree | Contact form handling |
| Cloudflare Pages | Hosting and CDN |

### Development Tools

- **Version Control**: Git
- **Code Editor**: VS Code (recommended)
- **Package Manager**: npm
- **Browser DevTools**: Chrome/Firefox DevTools

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git installed
- Text editor or IDE (VS Code recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/nkv-dev/Portfolio-nkv-dev.git
cd Portfolio-nkv-dev

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:4321
```

### Quick Start Checklist

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Update contact information in components
- [ ] Replace avatar image in public/images
- [ ] Update social links
- [ ] Configure Formspree endpoint
- [ ] Test locally
- [ ] Deploy to hosting

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run astro        # Run Astro CLI commands
```

### File Organization Principles

- **Separation of Concerns**: Components, layouts, pages
- **Modular Architecture**: Each section has its own component
- **Progressive Enhancement**: Core functionality works without JS
- **Type Safety**: TypeScript for better DX

### Code Standards

#### Astro
- Use components for reusable UI elements
- Keep components small and focused
- Use content collections for data

#### CSS
- Use CSS custom properties (variables) for theming
- Mobile-first responsive design approach
- Minimize specificity conflicts

#### JavaScript
- Use ES6+ features (const/let, arrow functions, async/await)
- Event delegation for dynamic elements
- Debounce/throttle performance-critical functions

### Customization Guide

#### Update Personal Information

Edit the following in respective Astro components:

```astro
<!-- Hero Section -->
<h1>Hi, <span class="text-warning">Nitesh Kumar Verma</span> here</h1>

<!-- Contact Section - Update email -->
<span>email@example.com</span>
```

#### Customize Color Scheme

Edit `src/styles/global.css`:

```css
:root {
  --primary: #ef4444;
  --secondary: #dc2626;
  /* Add more custom properties */
}
```

## Deployment

### Supported Platforms

This portfolio is optimized for static hosting:

- ✅ Cloudflare Pages (Recommended)
- ✅ GitHub Pages
- ✅ Netlify
- ✅ Vercel
- ✅ AWS S3 + CloudFront
- ✅ Any static web server

### Cloudflare Pages Deployment (Recommended)

1. **Connect repository**

   - Push code to GitHub
   - Connect repo in Cloudflare Pages dashboard

2. **Build settings**

   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output directory: `dist`

3. **Deploy**

   - Automatic deployments on git push
   - Custom domain support available

### GitHub Pages Deployment

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / root
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

## Performance

### Optimization Strategies

**Loading Performance**

- Lazy Loading: Images load as they enter viewport
- Preload Critical Resources: CSS and first content
- Defer Non-Critical JS: Scripts load after page render
- Resource Hints: preload, prefetch directives

**Runtime Performance**

- GPU Acceleration: CSS transforms use GPU
- Intersection Observer: Efficient scroll detection
- Debounced Events: Scroll/resize handlers optimized
- Will-Change: Strategic use for animations

**Asset Optimization**

- Image Optimization: Compressed formats
- CSS Optimization: Minified for production
- JS Optimization: Modular loading

### Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint (FCP) | < 1.8s | - |
| Largest Contentful Paint (LCP) | < 2.5s | - |
| Time to Interactive (TTI) | < 3.8s | - |
| Cumulative Layout Shift (CLS) | < 0.1 | - |

## Accessibility

### Standards Compliance

This portfolio follows WCAG 2.1 Level AA guidelines:

- **Perceivable**: Content available to all senses
- **Operable**: Interface works with keyboard/assistive tech
- **Understandable**: Information and UI are clear
- **Robust**: Works with current and future technologies

### Accessibility Features

- **Navigation**
  - Skip-to-content link for screen readers
  - Keyboard-navigable menu
  - Focus indicators on interactive elements
  - Logical tab order

- **Content**
  - Semantic HTML structure
  - ARIA labels for icons and buttons
  - Alt text for all images
  - Sufficient color contrast (4.5:1 minimum)

- **Interactive Elements**
  - Form labels associated with inputs
  - Error messages announced to screen readers
  - Loading states communicated
  - Reduced motion support

### Testing Accessibility

Use these tools to verify:

- Lighthouse (Chrome DevTools)
- axe DevTools (browser extension)
- WAVE (web accessibility evaluation tool)
- Screen Readers: NVDA (Windows), VoiceOver (Mac)

## Browser Support

### Supported Browsers

| Browser | Minimum Version | Support Level |
|---------|-----------------|---------------|
| Chrome | 80+ | Full support |
| Firefox | 75+ | Full support |
| Safari | 13+ | Full support |
| Edge | 80+ | Full support |

### Progressive Enhancement

- Modern browsers: Full animations and interactions
- Older browsers: Graceful degradation
- No JavaScript: Content still accessible
- Reduced motion: Respects user preferences

## Contributing

Contributions are welcome! Please read our Contributing Guidelines for details on:

- Code of conduct
- How to submit issues
- How to propose changes
- Development setup
- Testing requirements

### Ways to Contribute

- **Bug Reports**: Found an issue? Open an issue
- **Feature Requests**: Have an idea? Suggest it
- **Code Contributions**: Submit a Pull Request
- **Documentation**: Improve docs and README

## Security

### Security Considerations

- Formspree Integration: Form submissions are handled securely
- No User Data Storage: Site doesn't collect/store user data
- HTTPS Only: Enforce HTTPS in production
- Content Security Policy: Implement CSP headers
- Dependency Management: Regular security updates

## License

This project is licensed under the MIT License - see the LICENSE file for details.

MIT License

Copyright (c) 2026 Nitesh Kumar Verma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contact

Nitesh Kumar Verma

- **Email**: nitesh.techcollab@gmail.com
- **LinkedIn**: linkedin.com/in/nitesh-kumar-verma-408249334
- **GitHub**: github.com/nkv-dev
- **X (Twitter)**: x.com/nkv_dev

## Acknowledgments

- Astro Team for the excellent framework
- Cloudflare for hosting and CDN services
- Formspree for form handling
- Bootstrap Team for the CSS framework
- Open Source Community for tools and resources

## Roadmap

### Completed

- [x] Hero section with video background
- [x] About section with interactive panels
- [x] Projects showcase with physics engine
- [x] Contact form with Formspree
- [x] Responsive mobile design
- [x] Performance optimizations
- [x] Accessibility compliance
- [x] Migrated to Astro framework
- [x] View Transitions support

### Planned

- [ ] Dark/Light theme toggle
- [ ] Blog section integration
- [ ] Project filtering by technology
- [ ] Multi-language support
- [ ] PWA (Progressive Web App) features

---

Built with ❤️ and ☕ by Nitesh Kumar Verma

⭐ Star this repo if you found it helpful!
