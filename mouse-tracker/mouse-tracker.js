// ================= MOUSE TRACKER MODULE =================

class MouseTracker {
  constructor() {
    this.tracker = null;
    this.cursorX = 0;
    this.cursorY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.isHovering = false;
    this.trailElements = [];
    this.lastTrailTime = 0;
    this.isMoving = false;
    this.moveTimeout = null;
    this.interactiveElements = null;
    this.magneticElements = null;
    
    this.init();
  }

  // Initialize mouse tracker
  init() {
    // Create tracker element
    this.createTracker();
    
    // Get interactive and magnetic elements
    this.setupInteractiveElements();
    
    // Add event listeners
    this.addEventListeners();
    
    // Start animation loop
    this.animate();
  }

  // Create the mouse tracker element
  createTracker() {
    this.tracker = document.createElement('div');
    this.tracker.className = 'mouse-tracker';
    document.body.appendChild(this.tracker);
  }

  // Setup interactive elements (buttons, links, etc.)
  setupInteractiveElements() {
    // Elements that trigger hover effect
    this.interactiveElements = document.querySelectorAll(
      'a, button, .github-link, .social-link, .nav-link, ' +
      '.footer-social-link, .load-more-btn, .submit-btn, ' +
      '.tech-badge, .project-card, .contact-info, ' +
      '.email-container, .social-link'
    );

    // Elements with magnetic effect
    this.magneticElements = document.querySelectorAll(
      '.github-link, .social-link, .footer-social-link'
    );
  }

  // Add event listeners
  addEventListeners() {
    // Mouse movement
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    
    // Mouse enter/leave viewport
    document.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
    document.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
    
    // Click effects
    document.addEventListener('click', (e) => this.handleClick(e));
    
    // Touch device detection
    if ('ontouchstart' in window) {
      this.tracker.style.display = 'none';
    }

    // Magnetic element hover
    this.magneticElements.forEach(element => {
      element.addEventListener('mouseenter', () => this.handleMagneticEnter(element));
      element.addEventListener('mouseleave', () => this.handleMagneticLeave());
      element.addEventListener('mousemove', (e) => this.handleMagneticMove(e));
    });

    // Interactive element hover
    this.interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => this.handleInteractiveEnter());
      element.addEventListener('mouseleave', () => this.handleInteractiveLeave());
    });
  }

  // Handle mouse movement
  handleMouseMove(e) {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
    this.isMoving = true;

    // Clear existing timeout
    clearTimeout(this.moveTimeout);

    // Set timeout to detect when mouse stops
    this.moveTimeout = setTimeout(() => {
      this.isMoving = false;
    }, 100);

    // Create trail effect
    this.createTrail();
  }

  // Handle mouse entering viewport
  handleMouseEnter(e) {
    if (e.target === document.documentElement) {
      this.tracker.style.opacity = '1';
    }
  }

  // Handle mouse leaving viewport
  handleMouseLeave(e) {
    if (e.target === document.documentElement) {
      this.tracker.style.opacity = '0';
    }
  }

  // Handle click events
  handleClick(e) {
    this.createRipple(e.clientX, e.clientY);
  }

  // Handle hovering over interactive elements
  handleInteractiveEnter() {
    this.tracker.classList.add('interactive');
  }

  handleInteractiveLeave() {
    this.tracker.classList.remove('interactive');
  }

  // Handle magnetic effect
  handleMagneticEnter(element) {
    this.tracker.classList.add('magnetic');
  }

  handleMagneticLeave() {
    this.tracker.classList.remove('magnetic');
  }

  handleMagneticMove(e) {
    if (!this.tracker.classList.contains('magnetic')) return;

    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 100;
    
    if (distance < maxDistance) {
      const strength = (1 - distance / maxDistance) * 0.3;
      this.targetX += deltaX * strength;
      this.targetY += deltaY * strength;
    }
  }

  // Create trail effect
  createTrail() {
    const now = Date.now();
    if (now - this.lastTrailTime < 50) return; // Throttle trail creation
    
    this.lastTrailTime = now;
    
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = this.targetX + 'px';
    trail.style.top = this.targetY + 'px';
    
    document.body.appendChild(trail);
    this.trailElements.push(trail);

    // Remove trail after animation
    setTimeout(() => {
      trail.remove();
      this.trailElements = this.trailElements.filter(t => t !== trail);
    }, 800);
  }

  // Create ripple effect on click
  createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'mouse-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    document.body.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Animation loop for smooth movement
  animate() {
    // Smooth lerp movement
    const lerpSpeed = 0.15;
    this.cursorX += (this.targetX - this.cursorX) * lerpSpeed;
    this.cursorY += (this.targetY - this.cursorY) * lerpSpeed;

    // Apply position
    this.tracker.style.left = this.cursorX + 'px';
    this.tracker.style.top = this.cursorY + 'px';

    // Continue animation loop
    requestAnimationFrame(() => this.animate());
  }

  // Cleanup method
  destroy() {
    if (this.tracker) {
      this.tracker.remove();
    }
    
    // Remove all trails
    this.trailElements.forEach(trail => trail.remove());
    this.trailElements = [];
    
    // Remove event listeners
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('click', this.handleClick);
    
    clearTimeout(this.moveTimeout);
  }
}

// Initialize mouse tracker when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Only initialize on desktop devices
  if (window.innerWidth > 768 && !('ontouchstart' in window)) {
    window.mouseTracker = new MouseTracker();
  }

  // Handle window resize for mobile detection
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
      if (window.mouseTracker) {
        window.mouseTracker.destroy();
        window.mouseTracker = null;
      }
    } else {
      if (!window.mouseTracker) {
        window.mouseTracker = new MouseTracker();
      }
    }
  });
});

// Expose for potential external use
window.MouseTracker = MouseTracker;