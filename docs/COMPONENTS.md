# Component Documentation

Detailed documentation for each major component/section of the portfolio.

## Table of Contents

- [Hero Section](#hero-section)
- [About Section](#about-section)
- [Achievements Section](#achievements-section)
- [Projects Section](#projects-section)
- [Contact Section](#contact-section)
- [Footer](#footer)
- [Navigation](#navigation)
- [Bubble Physics Engine](#bubble-physics-engine)
- [Performance Module](#performance-module)

---

## Hero Section

### Overview

The hero section is the first thing visitors see. It features a dynamic video background with smooth transitions and an animated typewriter effect.

**Files:**
- HTML: `index.html` (lines 60-87)
- CSS: `src/styles/main.css`
- JS: `src/scripts/main.js`

### Features

1. **Video Background**
   - 5 looping videos with crossfade transitions
   - Optimized for performance (muted, playsinline)
   - Double-buffering for seamless transitions

2. **Typewriter Effect**
   - Rotates through multiple roles ("Coder", "Web Developer", etc.)
   - Blinking cursor animation
   - Smooth character-by-character typing

3. **Call-to-Action**
   - "Explore My Work" button
   - Smooth scroll to projects section

### Video Configuration

```javascript
// src/scripts/main.js
const playlist = [
  { src: "assets/videos/pc.mp4", start: 0, end: 5 },
  { src: "assets/videos/eletronics.mp4", start: 0, end: 5 },
  // ... more videos
];
```

**Video Requirements:**
- Format: MP4 (H.264 codec)
- Resolution: 1920x1080 recommended
- Duration: 5-10 seconds each
- Size: Optimize for web (< 20MB each)

### Typewriter Customization

```javascript
// src/scripts/main.js
const words = [
  "Software Engineer",
  "Web Developer",
  "Your Title Here",
  "Add More Titles"
];
```

**Configuration:**
- `typingSpeed`: 100ms per character
- `deleteSpeed`: 50ms per character
- `pauseTime`: 2000ms between words

### Performance Considerations

- Videos are preloaded for smooth transitions
- Fallback to static image if videos fail
- Reduced motion support (`prefers-reduced-motion`)

---

## About Section

### Overview

The about section presents your profile, education, interests, and quick facts through an interactive layout.

**Files:**
- HTML: `index.html` (lines 90-167)
- CSS: `src/styles/about.css`
- JS: `src/scripts/about.js`

### Features

1. **Profile Card**
   - Avatar image
   - Name and title
   - Download CV button
   - Social links

2. **Content Card**
   - Bio text
   - Info boxes (Study, Interests, Goal, Status)
   - Interactive hover effects

3. **Overlay Panels**
   - Education panel (degrees, institutions)
   - Interests panel (technologies, skills)
   - Smooth open/close animations

### Profile Card Structure

```html
<div class="profile-card">
  <div class="avatar-wrapper">
    <img src="assets/images/avatar.jpg" alt="Avatar">
  </div>
  <h5>Nitesh Kumar Verma</h5>
  <p class="role-text">BCA Student</p>
  <a href="#" class="btn btn-danger">Download CV</a>
  <div class="social-icons">
    <!-- GitHub, LinkedIn, Twitter -->
  </div>
</div>
```

### Info Boxes

```html
<div class="info-box ios-interactive" id="studyBtn">
  <span class="info-label">STUDY</span>
  <p>Software Engineering</p>
</div>
```

**Interactive Elements:**
- Click "Study" → Opens education overlay
- Click "Interests" → Opens interests overlay
- Hover effects with iOS-style interactions

### Education Panel

```html
<div id="eduOverlay"></div>
<div id="eduPanel">
  <div class="edu-header">
    <h3>Education</h3>
    <span class="close-btn" onclick="closeEdu()">×</span>
  </div>
  <div class="edu-content">
    <div class="edu-item current">
      <span class="year">Current</span>
      <h4>Bachelor of Computer Applications</h4>
      <p class="college">MS Ramaiah College</p>
      <p class="meta">CGPA – 9.3 | Final Year</p>
    </div>
    <!-- More edu items -->
  </div>
</div>
```

### Customization

**Update Avatar:**
Replace `assets/images/avatar.jpg` with your photo (recommended: 400x400px, square)

**Update Bio:**
```html
<p class="content-text">
  Your bio text here...
</p>
```

**Update Education:**
Edit the education items in `index.html` (lines 181-204)

---

## Achievements Section

### Overview

Showcase notable achievements, certifications, and milestones in a card-based layout.

**Files:**
- HTML: `index.html` (lines 253-347)
- CSS: `src/styles/achievements.css`

### Features

1. **Achievement Cards**
   - Icon (Bootstrap icons)
   - Date badge
   - Title and description
   - Links to proofs/certificates
   - Category badges

2. **Responsive Grid**
   - 2-column on desktop
   - 1-column on mobile
   - Hover lift effect

### Card Structure

```html
<div class="achievement-card">
  <div class="achievement-icon">
    <i class="bi bi-trophy-fill"></i>
  </div>
  <div class="achievement-content">
    <span class="achievement-date">2024</span>
    <h4>2nd Place - Hackathon</h4>
    <p>Description of achievement...</p>
    <a href="#" class="achievement-link">View Project →</a>
  </div>
</div>
```

### Adding Achievements

Copy the card structure and customize:

```html
<div class="achievement-card">
  <div class="achievement-icon">
    <i class="bi bi-[icon-name]"></i>
  </div>
  <div class="achievement-content">
    <span class="achievement-date">YYYY</span>
    <h4>Your Achievement Title</h4>
    <p>Description...</p>
    <span class="achievement-badge">Category</span>
  </div>
</div>
```

**Available Icons:** [Bootstrap Icons](https://icons.getbootstrap.com/)

---

## Projects Section

### Overview

The projects section showcases your work with a dynamic grid and an interactive bubble physics background.

**Files:**
- HTML: `index.html` (lines 350-501)
- CSS: `src/styles/projects.css`
- JS: `src/scripts/projects.js`, `src/scripts/bubble-physics.js`

### Features

1. **Bubble Physics Background**
   - 30 interactive technology bubbles (desktop)
   - 12 bubbles (mobile)
   - Mouse chase/repel behavior
   - Collision detection
   - Floating animation

2. **Projects Grid**
   - Dynamic loading from JavaScript array
   - Card layout with image, title, description
   - Technology tags
   - GitHub/demo links
   - "Load More" functionality

3. **Responsive Design**
   - 3 columns on desktop
   - 2 columns on tablet
   - 1 column on mobile

### Bubble Physics Engine

**Technical Details:**
- Pure JavaScript (no libraries)
- Uses `requestAnimationFrame` for 60fps
- CSS transforms for GPU acceleration
- Sub-pixel positioning for smooth movement
- Collision detection with repulsion
- Mobile-optimized (reduced bubble count)

**Configuration:**
```javascript
// src/scripts/bubble-physics.js
const CONFIG = {
  bubbleCount: window.innerWidth < 768 ? 12 : 30,
  mouseRadius: 150,
  repulsionForce: 0.8,
  friction: 0.95,
  floatSpeed: 0.5
};
```

**Tech Bubbles:**
- Python, JavaScript, C, PHP, C++
- Git, MongoDB, Arduino, ESP32
- Node.js, Docker, React, Vue
- TypeScript, Tailwind, Bootstrap
- And more...

### Project Cards

```html
<div class="project-card">
  <div class="project-image">
    <img src="project-image.jpg" alt="Project Name">
  </div>
  <div class="project-content">
    <h3>Project Title</h3>
    <p>Project description...</p>
    <div class="project-tech">
      <span class="tech-tag">React</span>
      <span class="tech-tag">Node.js</span>
    </div>
    <div class="project-links">
      <a href="#" class="btn btn-primary">Demo</a>
      <a href="#" class="btn btn-secondary">GitHub</a>
    </div>
  </div>
</div>
```

### Adding Projects

Edit `src/scripts/projects.js`:

```javascript
const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Brief description of what the project does and technologies used.",
    image: "assets/images/project1.jpg",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/username/repo",
    demo: "https://demo-link.com",
    category: "web"
  }
  // Add more projects...
];
```

### Performance

- Images lazy-loaded
- Bubbles pause when not visible (IntersectionObserver)
- Reduced bubbles on mobile for performance
- GPU-accelerated animations

---

## Contact Section

### Overview

The contact section allows visitors to get in touch through a modern, interactive form and contact information display.

**Files:**
- HTML: `index.html` (lines 504-724)
- CSS: `src/styles/contact.css`
- JS: `src/scripts/contact.js`

### Features

1. **Contact Info Card**
   - Profile avatar
   - Availability badge
   - Email with copy-to-clipboard
   - Location and response time
   - Social media links with tooltips

2. **Contact Form**
   - Name, Email, Subject fields
   - Message textarea with character counter
   - Real-time validation
   - Formspree integration
   - Loading states
   - Success/error messages

3. **Visual Effects**
   - Floating particle background
   - 3D tilt effect on cards
   - Typing animation for title
   - Confetti on success
   - Toast notifications

### Contact Info Card

**Structure:**
```html
<div class="contact-info-card" data-tilt>
  <div class="contact-glow"></div>
  <div class="contact-header">
    <div class="contact-avatar">
      <i class="bi bi-person-circle"></i>
    </div>
    <h3>Nitesh Kumar Verma</h3>
    <p>BCA Student</p>
  </div>
  
  <div class="availability-badge">
    <span class="pulse-dot"></span>
    <span class="availability-text">Open to Work</span>
  </div>
  
  <div class="contact-methods">
    <div class="contact-method" onclick="copyContactEmail('email@example.com', this)">
      <div class="method-icon">
        <i class="bi bi-envelope-fill"></i>
      </div>
      <div class="method-info">
        <span class="method-label">Email</span>
        <span class="method-value">email@example.com</span>
      </div>
    </div>
    <!-- More methods... -->
  </div>
</div>
```

**Features:**
- Copy-to-clipboard on email click
- Toast notification on copy
- Hover animations
- 3D tilt effect

### Contact Form

**Form Fields:**
1. **Name** (required) - Text input
2. **Email** (required) - Email validation
3. **Subject** (required) - Dropdown select
4. **Message** (required) - Textarea with character counter

**Formspree Integration:**
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_ENDPOINT" method="POST">
  <input type="hidden" name="_subject" value="New message from portfolio!">
  <!-- Form fields -->
</form>
```

**Validation:**
- Real-time validation on blur
- Visual error states
- Character counter (0/1000)
- Required field checks

**Submission Flow:**
1. User fills form
2. Click "Send Message"
3. Loading state shows
4. POST to Formspree
5. Success message + confetti
6. Form resets after 5 seconds

### Customization

**Update Formspree Endpoint:**
Replace `YOUR_ENDPOINT` in the form action URL with your actual Formspree form ID.

**Update Contact Info:**
Edit the HTML directly:
```html
<span class="method-value" id="contactEmail">your.email@example.com</span>
```

**Update Social Links:**
```html
<a href="https://github.com/yourusername" target="_blank" class="contact-social-link github">
  <i class="bi bi-github"></i>
</a>
```

---

## Footer

### Overview

Professional footer with navigation, social links, and back-to-top functionality.

**Files:**
- HTML: `index.html` (lines 610-675)
- CSS: `src/styles/footer.css`
- JS: `src/scripts/footer.js`

### Features

1. **Three-Column Layout**
   - Brand description
   - Quick links
   - Social media links

2. **Footer Bottom**
   - Copyright notice
   - Privacy/Terms links

3. **Back-to-Top Button**
   - Appears after scrolling
   - Smooth scroll to top
   - Progress indicator (optional)

### Structure

```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-content">
      <!-- Brand -->
      <div class="footer-brand">
        <h3>Nitesh Kumar Verma</h3>
        <p>BCA Student</p>
      </div>
      
      <!-- Links -->
      <div class="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <!-- More links -->
        </ul>
      </div>
      
      <!-- Social -->
      <div class="footer-social">
        <h4>Connect</h4>
        <div class="footer-social-links">
          <!-- Social icons -->
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>© 2026 Nitesh Kumar Verma</p>
    </div>
  </div>
  
  <!-- Back to top -->
  <button class="back-to-top" id="backToTop">
    <i class="bi bi-arrow-up"></i>
  </button>
</footer>
```

### Back-to-Top Button

**Behavior:**
- Hidden by default
- Appears after scrolling 300px
- Smooth scroll to top on click
- Hover animation

---

## Navigation

### Overview

Fixed navigation bar with smooth scrolling and active section highlighting.

**Files:**
- HTML: `index.html` (lines 36-54)
- CSS: `src/styles/nav.css`
- JS: `src/scripts/nav.js`

### Features

1. **Fixed Header**
   - Stays at top on scroll
   - Backdrop blur effect
   - Transparent to solid background transition

2. **Navigation Links**
   - Smooth scroll to sections
   - Active state highlighting
   - Hover effects

3. **Mobile Menu**
   - Hamburger toggle
   - Full-screen overlay
   - Touch-friendly
   - Animation on open/close

### Structure

```html
<header class="site-header">
  <nav class="main-nav" aria-label="Main navigation">
    <a href="#" class="nav-logo">Portfolio</a>
    
    <button class="nav-toggle" id="navToggle" aria-expanded="false">
      <span class="hamburger"></span>
      <span class="hamburger"></span>
      <span class="hamburger"></span>
    </button>
    
    <ul class="nav-menu" id="navMenu">
      <li><a href="#hero" class="nav-link active">Home</a></li>
      <li><a href="#about" class="nav-link">About</a></li>
      <li><a href="#achievements" class="nav-link">Achievements</a></li>
      <li><a href="#projects" class="nav-link">Projects</a></li>
      <li><a href="#contact" class="nav-link">Contact</a></li>
    </ul>
  </nav>
</header>
```

### Active Section Detection

Uses IntersectionObserver to detect which section is currently in view:

```javascript
// src/scripts/nav.js
const observerOptions = {
  threshold: 0.3,
  rootMargin: '-50px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      updateActiveLink(entry.target.id);
    }
  });
}, observerOptions);
```

### Customization

**Add New Nav Item:**
```html
<li><a href="#new-section" class="nav-link">New Section</a></li>
```

**Change Logo:**
```html
<a href="#" class="nav-logo">Your Name</a>
```

---

## Bubble Physics Engine

### Overview

Advanced physics simulation for interactive background bubbles in the projects section.

**File:** `src/scripts/bubble-physics.js`

### Technical Architecture

**Core Components:**

1. **Bubble Class**
   - Position (x, y)
   - Velocity (vx, vy)
   - Radius
   - Tech icon
   - DOM element

2. **Physics Engine**
   - Animation loop (requestAnimationFrame)
   - Mouse tracking
   - Collision detection
   - Force calculations

3. **Render System**
   - CSS transforms for positioning
   - GPU acceleration
   - Sub-pixel precision

### Physics Model

```javascript
class Bubble {
  update() {
    // Apply forces
    this.applyMouseForce();
    this.applyFriction();
    this.applyFloat();
    
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    
    // Boundary collision
    this.checkBoundaries();
    
    // Render
    this.render();
  }
  
  applyMouseForce() {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < mouseRadius) {
      const force = (mouseRadius - distance) / mouseRadius;
      this.vx -= (dx / distance) * force * repulsionStrength;
      this.vy -= (dy / distance) * force * repulsionStrength;
    }
  }
}
```

### Configuration

```javascript
const CONFIG = {
  // Performance
  bubbleCount: isMobile ? 12 : 30,
  targetFPS: 60,
  
  // Physics
  mouseRadius: 150,
  repulsionStrength: 0.8,
  friction: 0.95,
  floatSpeed: 0.5,
  
  // Visual
  minRadius: 30,
  maxRadius: 60,
  bubbleOpacity: 0.8
};
```

### Performance Optimizations

1. **Viewport Culling**
   - Only animate bubbles in viewport
   - Pause when section not visible

2. **Frame Rate Management**
   - Skip frames if running slow
   - Adaptive quality based on FPS

3. **GPU Acceleration**
   ```css
   .bubble {
     transform: translate3d(x, y, 0);
     will-change: transform;
   }
   ```

4. **Mobile Optimizations**
   - Reduced bubble count
   - Simplified physics
   - Touch event handling

### Adding Tech Bubbles

Edit the tech array in `bubble-physics.js`:

```javascript
const techStack = [
  { icon: 'devicon-python-plain', name: 'Python' },
  { icon: 'devicon-javascript-plain', name: 'JavaScript' },
  // Add more...
];
```

**Icon Source:** [Devicon](https://devicon.dev/)

---

## Performance Module

### Overview

Performance monitoring and optimization utilities.

**File:** `src/scripts/performance.js`

### Features

1. **Lazy Loading**
   - Images load as they enter viewport
   - Uses IntersectionObserver
   - Placeholder while loading

2. **Core Web Vitals Monitoring**
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)

3. **Resource Optimization**
   - Preload critical resources
   - Prefetch non-critical
   - Preconnect to domains

### Lazy Loading Implementation

```javascript
const lazyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      lazyObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  lazyObserver.observe(img);
});
```

### Web Vitals Monitoring

```javascript
// LCP
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
}).observe({ entryTypes: ['largest-contentful-paint'] });

// CLS
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

### Usage in HTML

```html
<!-- Lazy loading -->
<img data-src="image.jpg" alt="Description" class="lazy">

<!-- Preload critical -->
<link rel="preload" href="critical.css" as="style">

<!-- Prefetch next page -->
<link rel="prefetch" href="next-page.html">

<!-- Preconnect to domain -->
<link rel="preconnect" href="https://fonts.googleapis.com">
```

---

## Component Interactions

### Event Flow

```
User Action → Event Listener → Handler Function → DOM Update

Example:
Click Nav Link → nav.js listener → smoothScroll() → Scroll to section
              ↓
              → IntersectionObserver → updateActiveLink() → Update CSS class
```

### Module Dependencies

```
main.js ──────┐
              ├── No dependencies
              │
nav.js ───────┤
              │
about.js ─────┤
              │
projects.js ──┼── Imports bubble-physics.js
              │
bubble-physics.js ─── Standalone
              │
contact.js ───┤
              │
footer.js ────┤
              │
performance.js ┘
```

### Shared Utilities

All modules share these conventions:
- `DOMContentLoaded` event for initialization
- IntersectionObserver for scroll triggers
- CSS custom properties for theming
- Consistent error handling (try/catch)

---

## Customization Guide

### Global Changes

**Colors:** Edit CSS variables in `main.css`
```css
:root {
  --tech-primary: #ef4444;
  --tech-secondary: #dc2626;
  --tech-glow: rgba(239, 68, 68, 0.3);
}
```

**Fonts:** Update in `index.html` head
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

### Section-Specific Changes

Each section can be customized by editing its respective files:
- **Hero**: `main.js` (typewriter words, video playlist)
- **About**: `index.html` (content, education, interests)
- **Projects**: `projects.js` (project data)
- **Contact**: `index.html` (email, social links, Formspree)
- **Footer**: `index.html` (links, copyright)

---

## Troubleshooting

### Component Not Working

1. Check browser console for errors
2. Verify file paths in HTML
3. Ensure scripts load with `defer` attribute
4. Check for CSS conflicts
5. Verify DOM elements exist before JS runs

### Performance Issues

1. Reduce bubble count on mobile
2. Optimize images/videos
3. Check for layout thrashing
4. Use DevTools Performance tab
5. Enable hardware acceleration

---

**Need more details?** Check individual source files or open an issue.
