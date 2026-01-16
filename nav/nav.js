// Enhanced Navigation with Smooth Scrolling and Active Section Highlighting
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarNav = document.querySelector('.navbar-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const islandNav = document.querySelector('.island-navbar');
    let isMenuOpen = false;
    
    // iOS-style smooth menu toggle
    navbarToggler.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!isMenuOpen) {
            // Opening menu
            navbarCollapse.classList.add('show');
            islandNav.classList.add('menu-open');
            isMenuOpen = true;
            
            // Haptic feedback simulation (visual)
            navigator.vibrate && navigator.vibrate(10);
            
            // Stagger animation reset
            navLinks.forEach((link, index) => {
                link.style.animation = 'none';
                setTimeout(() => {
                    link.style.animation = '';
                }, 10);
            });
        } else {
            // Closing menu with iOS-style fade
            closeMenu();
        }
    });
    
    function closeMenu() {
        navbarCollapse.classList.remove('show');
        islandNav.classList.remove('menu-open');
        isMenuOpen = false;
        
        // Haptic feedback for close
        navigator.vibrate && navigator.vibrate(5);
    }
    
    // Close menu when clicking on nav links with smooth transition
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow smooth scroll to section first
            setTimeout(() => {
                closeMenu();
            }, 150);
        });
        
        // Add iOS-style hover effect
        link.addEventListener('touchstart', function() {
            this.style.transform = 'translateX(3px) scale(0.98)';
        });
        
        link.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Close menu when clicking outside (iOS-style behavior)
    document.addEventListener('click', function(e) {
        if (isMenuOpen && 
            !navbarToggler.contains(e.target) && 
            !navbarCollapse.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Prevent menu close when clicking inside menu
    navbarCollapse.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Swipe to close gesture (iOS-style)
    let touchStartY = 0;
    let touchEndY = 0;
    
    navbarNav.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    navbarNav.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeDistance = touchEndY - touchStartY;
        // Swipe down to close
        if (swipeDistance > 100 && isMenuOpen) {
            closeMenu();
        }
    }
    
    // Escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Add menu-open state styling
    const style = document.createElement('style');
    style.textContent = `
        .island-navbar.menu-open {
            background: rgba(255, 255, 255, 0.25) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
        }
        
        .nav-link.active {
            color: var(--tech-primary) !important;
            font-weight: 600;
            position: relative;
        }
        
        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 2px;
            background: linear-gradient(90deg, var(--tech-primary), var(--tech-secondary));
            border-radius: 1px;
        }
        
        /* Smooth scroll behavior */
        html {
            scroll-behavior: smooth;
        }
        
        /* Scroll progress indicator */
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--tech-primary), var(--tech-secondary));
            z-index: 9999;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize smooth scrolling and active section highlighting
    initSmoothScrolling();
    initActiveSectionHighlighting();
    initScrollProgress();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state immediately
                updateActiveLink(targetId);
            }
        });
    });
}

// Active section highlighting
function initActiveSectionHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Account for navbar
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Special case for hero section at top
        if (scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#hero') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Initial call
    updateActiveLink();
}

// Scroll progress indicator
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    function updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = (window.pageYOffset / documentHeight) * 100;
        
        progressBar.style.width = scrolled + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
    
    // Initial call
    updateProgress();
}

// Navbar scroll effects
function initNavbarScrollEffects() {
    const navbar = document.querySelector('.island-navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll (optional - can be commented out if not desired)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Initialize navbar effects
document.addEventListener('DOMContentLoaded', function() {
    initNavbarScrollEffects();
});

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Ensure proper focus management
        const navbar = document.querySelector('.island-navbar');
        navbar.style.outline = '2px solid var(--tech-primary)';
        navbar.style.outlineOffset = '2px';
        
        // Remove outline after keyboard navigation is complete
        setTimeout(() => {
            navbar.style.outline = '';
            navbar.style.outlineOffset = '';
        }, 5000);
    }
});