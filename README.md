# Nitesh Kumar Verma - Portfolio Website

A modern, responsive portfolio website built with HTML5, CSS3, and vanilla JavaScript featuring smooth animations, interactive components, and performance optimizations.

## 🚀 Features

- **Hero Section** with video background and typing effect
- **About Section** with interactive panels for education and interests
- **Projects Section** with dynamic loading and advanced bubble physics
- **Contact Section** with copy-to-email functionality and social links
- **Professional Footer** with quick navigation and back-to-top button
- **Smooth Navigation** with active section highlighting
- **Mobile Responsive** with touch-friendly interactions
- **Performance Optimized** with lazy loading and GPU acceleration
- **Accessibility Compliant** with keyboard navigation and screen reader support

## 📁 Professional File Structure

```
Portfolio/
├── 📄 index.html                  # Main portfolio entry point
├── 📁 src/                       # Source code directory
│   ├── 📁 styles/                  # All CSS stylesheets
│   │   ├── main.css           # Global styles
│   │   ├── nav.css             # Navigation styles
│   │   ├── about.css           # About section styles
│   │   ├── projects.css        # Projects section styles
│   │   ├── contact.css         # Contact section styles
│   │   └── footer.css          # Footer section styles
│   ├── 📁 scripts/                 # All JavaScript modules
│   │   ├── main.js            # Core functionality (typewriter, video)
│   │   ├── nav.js             # Navigation functionality
│   │   ├── about.js           # About section functionality
│   │   ├── projects.js         # Projects functionality
│   │   ├── contact.js          # Contact functionality
│   │   ├── footer.js           # Footer functionality
│   │   ├── performance.js     # Performance optimizations
│   │   └── bubble-physics.js  # Advanced bubble physics engine
│   └── 📁 components/              # Component templates (future)
├── 📁 assets/                       # Media files
│   ├── 📁 images/                # Image assets
│   │   └── avatar.jpg          # Profile picture
│   └── 📁 videos/                # Background videos
│       ├── pcrunning.mp4       # Video 1
│       ├── eletronics.mp4       # Video 2
│       ├── drifting.mp4         # Video 3
│       ├── coding_website.mp4    # Video 4
│       └── army.mp4            # Video 5
├── 📋 README.md                       # Project documentation
└── 🚫 .gitignore                      # Ignore patterns
```

## ⚙️ Configuration

### Update Contact Information

Edit `src/scripts/contact/config.js` to update your personal information:

```javascript
const CONTACT_CONFIG = {
  personalEmail: 'your-email@example.com',
  professionalEmail: 'work@example.com',
  academicEmail: 'student@example.com',
  
  socialLinks: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
    twitter: 'https://twitter.com/yourhandle'
  },
  
  location: 'Your City, Country',
  availability: {
    status: 'Open to opportunities',
    responseTime: 'Usually within 24-48 hours',
    color: '#1aff8c'
  }
};
```

### Customize Colors

Edit CSS variables in `src/styles/main.css` to change color scheme:

```css
:root {
  --primary-color: #00ffd5;    /* Cyan accent */
  --secondary-color: #00b8ff;  /* Blue accent */
  --text-color: #fff;          /* White text */
  --bg-primary: #000;          /* Black background */
  --bg-secondary: #111;        /* Dark gray */
}
```

### Update Hero Section

Edit `src/scripts/main.js` to customize the typing effect words:

```javascript
const words = [
  "Coder",
  "Web Developer", 
  "Your Title Here",
  "Add More Roles"
];
```

## 🎨 Customization

### Add Profile Picture

Replace `assets/images/avatar.jpg` with your profile picture.

### Update Video Background

Add your video files to the `assets/videos/` folder and update the playlist in `src/scripts/main.js`:

```javascript
const playlist = [
  { src: "assets/videos/your-video.mp4", start: 0, end: 5 },
  { src: "assets/videos/another-video.mp4", start: 0, end: 5 }
];
```

## 🫧 Bubble Physics Engine

The projects section features an advanced bubble physics engine with:
- 30 interactive tech bubbles on desktop, 12 on mobile
- Collision detection and chase/repel behaviors
- Hardware-accelerated smooth animations
- Touch-friendly interactions on mobile
- Performance optimization for various devices
- Sub-pixel positioning for fluid movement
- Visual feedback with particle effects

## 📱 Mobile Features

- Touch-friendly interactions
- Swipe gestures for mobile menu
- Optimized video playback for mobile
- Responsive design for all screen sizes
- Optimized bubble performance for mobile devices

## ⚡ Performance Features

- Lazy loading for images
- GPU-accelerated animations
- Optimized scroll performance
- Service Worker support for caching
- Core Web Vitals monitoring
- Adaptive bubble performance based on device

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 7+)

## ♿ Accessibility

- Semantic HTML5 structure
- Keyboard navigation support
- Screen reader compatible
- ARIA labels where needed
- Focus management
- Reduced motion support

## 🔧 Development

### Local Development

1. Clone repository
2. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser

### Build for Production

1. Update all configuration files with your information
2. Optimize images and videos
3. Enable service worker in `src/scripts/performance.js`
4. Deploy to your hosting service

## 🌐 Deployment

### Static Hosting Ready

This portfolio is optimized for static hosting services:
- GitHub Pages
- Netlify
- Cloudflare Pages
- Vercel

No build process required - deploy files as-is.

### Development Workflow Benefits

**src/ directory structure provides:**
- 🎯 Clear separation of source and assets
- 🔧 Easy debugging and maintenance
- 📦 Ready for build tools if needed
- 🚀 Modern development practices
- 👥 Team collaboration friendly
- 📱 Mobile-first development approach

---

Built with passion and modern web technologies by Nitesh Kumar Verma