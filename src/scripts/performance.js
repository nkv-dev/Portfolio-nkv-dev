/***************************
 * PERFORMANCE & SCROLL OPTIMIZATIONS
 ***************************/

// Centralized scroll state management
const ScrollManager = {
    ticking: false,
    lastScrollY: 0,
    scrollDirection: 'up',
    documentHeight: 0,
    windowHeight: 0,
    sections: [],
    navLinks: [],
    footerLinks: [],
    progressBar: null,
    navbar: null,
    backToTopButton: null,
    
    // Initialize measurements
    init() {
        this.cacheMeasurements();
        this.cacheElements();
        this.cacheSections();
        this.bindEvents();
    },
    
    // Cache DOM measurements (expensive operations)
    cacheMeasurements() {
        this.windowHeight = window.innerHeight;
        this.documentHeight = document.documentElement.scrollHeight - this.windowHeight;
    },
    
    // Cache DOM elements
    cacheElements() {
        this.progressBar = document.querySelector('.scroll-progress');
        this.navbar = document.querySelector('.island-navbar');
        this.backToTopButton = document.getElementById('backToTop');
        this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        this.footerLinks = document.querySelectorAll('.footer-link[href^="#"]');
    },
    
    // Cache section data (expensive offset calculations)
    cacheSections() {
        this.sections = [];
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            this.sections.push({
                id: section.getAttribute('id'),
                offsetTop: section.offsetTop,
                offsetHeight: section.offsetHeight
            });
        });
    },
    
    // Bind all scroll-related events
    bindEvents() {
        // Single RAF-throttled scroll handler
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => this.handleScroll());
                this.ticking = true;
            }
        }, { passive: true });
        
        // Recalculate on resize
        window.addEventListener('resize', debounce(() => {
            this.cacheMeasurements();
            this.cacheSections();
        }, 250));
        
        // Recalculate when images load (affect document height)
        window.addEventListener('load', () => {
            this.cacheMeasurements();
            this.cacheSections();
        });
    },
    
    // Central scroll handler
    handleScroll() {
        const scrollY = window.pageYOffset;
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
    },
    
    // Update scroll progress bar
    updateProgressBar(scrollY) {
        if (!this.progressBar || this.documentHeight <= 0) return;
        const scrolled = (scrollY / this.documentHeight) * 100;
        this.progressBar.style.width = scrolled + '%';
    },
    
    // Update navbar visual effects
    updateNavbarEffects(scrollY) {
        if (!this.navbar) return;
        
        // Add shadow on scroll
        if (scrollY > 10) {
            this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            this.navbar.style.boxShadow = 'none';
        }
        
        // Hide/show on scroll direction
        if (this.scrollDirection === 'down' && scrollY > 100) {
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            this.navbar.style.transform = 'translateY(0)';
        }
    },
    
    // Update active section highlighting (nav + footer)
    updateActiveSection(scrollY) {
        const offset = 100; // Account for navbar
        let activeId = null;
        
        // Find active section
        for (const section of this.sections) {
            if (scrollY > section.offsetTop - offset && 
                scrollY <= section.offsetTop + section.offsetHeight - offset) {
                activeId = section.id;
                break;
            }
        }
        
        // Default to hero at top
        if (!activeId && scrollY < 100) {
            activeId = 'hero';
        }
        
        // Update nav links
        if (activeId) {
            this.updateLinks(this.navLinks, activeId);
            this.updateLinks(this.footerLinks, activeId);
        }
    },
    
    // Update link active states
    updateLinks(links, activeId) {
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },
    
    // Update back to top button visibility
    updateBackToTop(scrollY) {
        if (!this.backToTopButton) return;
        if (scrollY > 300) {
            this.backToTopButton.classList.add('visible');
        } else {
            this.backToTopButton.classList.remove('visible');
        }
    }
};

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!images.length) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Optimize animations for performance
function initAnimationOptimizations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.style.setProperty('--animation-duration', '0.01ms');
        document.body.style.setProperty('--transition-duration', '0.01ms');
    }
    
    // Use CSS transforms for better performance (only apply to visible elements)
    const animatedElements = document.querySelectorAll('.ios-interactive, .social-link, .footer-social-link');
    animatedElements.forEach(element => {
        element.style.willChange = 'transform';
        element.style.backfaceVisibility = 'hidden';
    });
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        'nav/nav.css',
        'about-me/about.css',
        'projects/projects.css',
        'contact/contact.css',
        'footer/footer.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Memory management
function initMemoryManagement() {
    // Clean up event listeners on page unload
    window.addEventListener('beforeunload', () => {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            const clone = element.cloneNode(false);
            element.parentNode.replaceChild(clone, element);
        });
    });
}

// Font loading optimization
function initFontOptimization() {
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
    
    const fontDisplayStyle = document.createElement('style');
    fontDisplayStyle.textContent = `
        @font-face {
            font-family: 'YourFont';
            font-display: swap;
        }
    `;
    document.head.appendChild(fontDisplayStyle);
}

// Critical CSS inlining
function inlineCriticalCSS() {
    const criticalCSS = `
        body { margin: 0; color: #fff; font-family: 'Segoe UI', sans-serif; overflow-x: hidden; background: #000; }
        .hero-section { position: relative; height: 100vh; overflow: hidden; }
        .island-nav-wrapper { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; }
        .typing { color: var(--tech-primary); font-weight: 600; }
        .cursor { display: inline-block; width: 2px; height: 1.2em; background-color: var(--tech-primary); margin-left: 5px; animation: blink 1s infinite; }
        @keyframes blink { 0%, 50%, 100% { opacity: 1; } 25%, 75% { opacity: 0; } }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
}

// Performance monitoring
function initPerformanceMonitoring() {
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            console.log('DOM Interactive:', perfData.domInteractive - perfData.navigationStart, 'ms');
        }
    });
    
    if ('PerformanceObserver' in window) {
        try {
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
            
            // Cumulative Layout Shift
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('CLS:', clsValue);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            // PerformanceObserver not supported
        }
    }
}

// Initialize all optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll manager
    ScrollManager.init();
    
    // Initialize other optimizations
    initLazyLoading();
    preloadCriticalResources();
    initAnimationOptimizations();
    initMemoryManagement();
    initFontOptimization();
    inlineCriticalCSS();
    initPerformanceMonitoring();
});

// Export utilities for other scripts
window.PerformanceUtils = {
    debounce,
    throttle,
    ScrollManager,
    initLazyLoading
};
