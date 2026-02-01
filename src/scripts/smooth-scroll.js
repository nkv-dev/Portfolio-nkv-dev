/***************************
 * LENIS SMOOTH SCROLL
 ***************************/

// Initialize Lenis smooth scroll with performance optimizations
let lenis;

function initLenis() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    
    // Skip smooth scroll if user prefers reduced motion or is on mobile with data saver
    if (prefersReducedMotion) {
        console.log('Smooth scroll disabled: reduced motion preference');
        return;
    }
    
    // Initialize Lenis with optimized settings
    lenis = new Lenis({
        duration: 1.2,              // Animation duration (seconds) - slightly longer for smoother feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
        orientation: 'vertical',     // Only vertical scroll
        gestureOrientation: 'vertical',
        smoothWheel: true,           // Enable smooth wheel scrolling
        wheelMultiplier: 1,          // Wheel scroll speed
        touchMultiplier: 2,          // Touch scroll speed (faster for mobile)
        infinite: false,             // No infinite scroll
        syncTouch: true,             // Sync with native touch scroll
    });
    
    // Connect Lenis to our RAF loop for optimal performance
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Integrate with ScrollManager if available
    integrateWithScrollManager();
    
    // Handle anchor links for smooth scroll to sections
    handleAnchorLinks();
    
    // Update CSS to work with Lenis
    updateCSSForLenis();
    
    console.log('Lenis smooth scroll initialized');
}

// Integrate Lenis with our ScrollManager
function integrateWithScrollManager() {
    // If ScrollManager exists, sync scroll position
    if (window.PerformanceUtils && window.PerformanceUtils.ScrollManager) {
        const originalHandleScroll = window.PerformanceUtils.ScrollManager.handleScroll.bind(window.PerformanceUtils.ScrollManager);
        
        // Override to use Lenis scroll position
        window.PerformanceUtils.ScrollManager.handleScroll = function() {
            const scrollY = lenis ? lenis.scroll : window.pageYOffset;
            const lastScrollY = this.lastScrollY;
            
            // Determine scroll direction
            this.scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
            
            // Update all scroll effects
            this.updateProgressBar(scrollY);
            this.updateNavbarEffects(scrollY);
            this.updateActiveSection(scrollY);
            this.updateBackToTop(scrollY);
            
            this.lastScrollY = scrollY;
            this.ticking = false;
        };
        
        // Listen to Lenis scroll events
        lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
            if (!window.PerformanceUtils.ScrollManager.ticking) {
                requestAnimationFrame(() => {
                    window.PerformanceUtils.ScrollManager.handleScroll();
                });
                window.PerformanceUtils.ScrollManager.ticking = true;
            }
        });
    }
}

// Handle anchor links with Lenis
function handleAnchorLinks() {
    // Override all anchor link clicks to use Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty anchors
            
            const target = document.querySelector(targetId);
            if (target && lenis) {
                e.preventDefault();
                
                // Calculate offset (account for fixed navbar)
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                // Smooth scroll to target
                lenis.scrollTo(targetPosition, {
                    offset: 0,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });
}

// Update CSS for Lenis compatibility
function updateCSSForLenis() {
    // Add Lenis-specific styles
    const lenisStyles = `
        html.lenis, html.lenis body {
            height: auto;
        }
        
        .lenis.lenis-smooth {
            scroll-behavior: auto !important;
        }
        
        .lenis.lenis-smooth [data-lenis-prevent] {
            overscroll-behavior: contain;
        }
        
        .lenis.lenis-stopped {
            overflow: hidden;
        }
        
        .lenis.lenis-scrolling iframe {
            pointer-events: none;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = lenisStyles;
    document.head.appendChild(styleSheet);
}

// Stop Lenis (for modals, overlays, etc.)
function stopLenis() {
    if (lenis) {
        lenis.stop();
        document.body.classList.add('lenis-stopped');
    }
}

// Start Lenis
function startLenis() {
    if (lenis) {
        lenis.start();
        document.body.classList.remove('lenis-stopped');
    }
}

// Scroll to a specific element
function scrollToElement(selector, options = {}) {
    const element = document.querySelector(selector);
    if (element && lenis) {
        const offset = options.offset || 80;
        const duration = options.duration || 1.5;
        
        lenis.scrollTo(element, {
            offset: -offset,
            duration: duration,
            easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)))
        });
    } else if (element) {
        // Fallback if Lenis not available
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure other scripts are loaded
    setTimeout(initLenis, 100);
});

// Export for global use
window.SmoothScroll = {
    lenis: () => lenis,
    scrollTo: scrollToElement,
    stop: stopLenis,
    start: startLenis
};
