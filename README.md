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

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main HTML file
├── style.css               # Global styles
├── script.js               # Main JavaScript (typewriter effect, video)
├── performance.js          # Performance optimizations
├── contact/
│   ├── contact.css         # Contact section styles
│   ├── contact.js          # Contact functionality
│   └── config.js           # Contact configuration
├── footer/
│   ├── footer.css          # Footer styles
│   └── footer.js           # Footer functionality
├── nav/
│   ├── nav.css             # Navigation styles
│   └── nav.js              # Navigation functionality
├── about-me/
│   ├── about.css           # About section styles
│   └── about.js            # About section functionality
├── projects/
│   ├── projects.css        # Projects section styles
│   ├── projects.js         # Projects functionality
│   └── bubble-physics.js  # Advanced bubble physics engine
└── assets/
    ├── avatar.jpg          # Profile picture
    ├── pcrunning.mp4       # Background videos
    ├── eletronics.mp4
    ├── drifting.mp4
    ├── coding_website.mp4
    └── army.mp4
```

## ⚙️ Configuration

### Update Contact Information

Edit `contact/config.js` to update your personal information:

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

Edit the CSS variables in `style.css` to change color scheme:

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

Edit `script.js` to customize the typing effect words:

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

Replace `assets/avatar.jpg` with your profile picture.

### Update Video Background

Add your video files to the `assets/` folder and update the playlist in `script.js`:

```javascript
const playlist = [
  { src: "assets/your-video.mp4", start: 0, end: 5 },
  { src: "assets/another-video.mp4", start: 0, end: 5 }
];
```

### Modify Sections

Each section is modular - you can:
- Add/remove sections from `index.html`
- Customize styles in respective CSS files
- Update functionality in respective JS files

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

## 🫧 Bubble Physics Engine

The projects section features an advanced bubble physics engine with:
- 30 interactive tech bubbles on desktop, 12 on mobile
- Collision detection and chase/repel behaviors
- Hardware-accelerated smooth animations
- Touch-friendly interactions on mobile
- Performance optimization for various devices

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
3. Enable service worker in `performance.js`
4. Deploy to your hosting service

## 🌐 Deployment

### Static Hosting Ready

This portfolio is optimized for static hosting services:
- GitHub Pages
- Netlify
- Cloudflare Pages
- Vercel

No build process required - deploy files as-is.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with passion and modern web technologies by Nitesh Kumar Verma