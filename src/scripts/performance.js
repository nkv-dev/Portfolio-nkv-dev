/***************************
 * PERFORMANCE OPTIMIZATIONS
 ***************************/

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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

// Optimize scroll performance
function initScrollOptimization() {
    let ticking = false;
    
    function updateScrollEffects() {
        // Update scroll progress
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = (window.pageYOffset / documentHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }
        
        // Update active section
        updateActiveSection();
        
        // Update navbar effects
        updateNavbarEffects();
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Debounce function for performance
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

// Throttle function for performance
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

// Optimize animations for performance
function initAnimationOptimizations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.style.setProperty('--animation-duration', '0.01ms');
        document.body.style.setProperty('--transition-duration', '0.01ms');
    }
    
    // Use CSS transforms for better performance
    const animatedElements = document.querySelectorAll('.ios-interactive, .social-link, .footer-social-link');
    animatedElements.forEach(element => {
        element.style.willChange = 'transform';
        element.style.backfaceVisibility = 'hidden';
    });
}

// Memory management
function initMemoryManagement() {
    // Clean up event listeners on page unload
    window.addEventListener('beforeunload', () => {
        // Remove all event listeners
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            const clone = element.cloneNode(false);
            element.parentNode.replaceChild(clone, element);
        });
    });
    
    // Clean up observers
    const observers = [];
    
    // Add intersection observers to array for cleanup
    document.addEventListener('DOMContentLoaded', () => {
        const contactObserver = new IntersectionObserver(() => {});
        const footerObserver = new IntersectionObserver(() => {});
        
        observers.push(contactObserver, footerObserver);
    });
}

// Font loading optimization
function initFontOptimization() {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    // Add your font file here if needed
    document.head.appendChild(fontLink);
    
    // Enable font display swap
    const fontDisplayStyle = document.createElement('style');
    fontDisplayStyle.textContent = `
        @font-face {
            font-family: 'YourFont';
            font-display: swap;
        }
    `;
    document.head.appendChild(fontDisplayStyle);
}

// Critical CSS inlining (for production)
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
    // Log performance metrics
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            console.log('DOM Interactive:', perfData.domInteractive - perfData.navigationStart, 'ms');
        }
    });
    
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
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
    }
}

// Service Worker for caching (for production)
function initServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    }
}

// Initialize all performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    preloadCriticalResources();
    initScrollOptimization();
    initAnimationOptimizations();
    initMemoryManagement();
    initFontOptimization();
    inlineCriticalCSS();
    initPerformanceMonitoring();
    
    // Initialize service worker in production
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        initServiceWorker();
    }
});

// Export functions for use in other scripts
window.PerformanceUtils = {
    debounce,
    throttle,
    initLazyLoading,
    initScrollOptimization
};