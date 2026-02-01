// Optimized Navigation with Accessibility and Performance
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.getElementById('navToggler');
    const navbarCollapse = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const firstNavLink = navLinks[0];
    const lastNavLink = navLinks[navLinks.length - 1];
    let isMenuOpen = false;
    
    // Initialize
    initMenuToggle();
    initSmoothScrolling();
    initActiveLinkTracking();
    
    function initMenuToggle() {
        if (!navbarToggler || !navbarCollapse) return;
        
        // Toggle menu on hamburger click
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (isMenuOpen) {
                    closeMenu();
                }
            });
        });
        
        // Close on backdrop click (click outside menu)
        document.addEventListener('click', function(e) {
            if (isMenuOpen && 
                !navbarToggler.contains(e.target) && 
                !navbarCollapse.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
        
        // Swipe to close on mobile
        initSwipeToClose();
    }
    
    function openMenu() {
        isMenuOpen = true;
        navbarCollapse.classList.add('show');
        navbarToggler.setAttribute('aria-expanded', 'true');
        
        // Focus first menu item
        setTimeout(() => {
            if (firstNavLink) firstNavLink.focus();
        }, 100);
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    }
    
    function closeMenu() {
        isMenuOpen = false;
        navbarCollapse.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
        
        // Return focus to toggler
        navbarToggler.focus();
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(5);
        }
    }
    
    // Focus trap for accessibility
    function handleKeyboard(e) {
        if (!isMenuOpen) {
            // Close on escape even if menu not open (for consistency)
            if (e.key === 'Escape') {
                closeMenu();
            }
            return;
        }
        
        switch(e.key) {
            case 'Escape':
                e.preventDefault();
                closeMenu();
                break;
                
            case 'Tab':
                // Trap focus within menu
                if (e.shiftKey) {
                    // Shift+Tab: going backwards
                    if (document.activeElement === firstNavLink) {
                        e.preventDefault();
                        lastNavLink.focus();
                    }
                } else {
                    // Tab: going forwards
                    if (document.activeElement === lastNavLink) {
                        e.preventDefault();
                        firstNavLink.focus();
                    }
                }
                break;
                
            case 'Home':
                e.preventDefault();
                firstNavLink.focus();
                break;
                
            case 'End':
                e.preventDefault();
                lastNavLink.focus();
                break;
        }
    }
    
    // Swipe to close menu - works on both menu and backdrop
    function initSwipeToClose() {
        let touchStartY = 0;
        let touchStartTime = 0;
        
        // Listen on the entire collapse area (menu + backdrop)
        navbarCollapse.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
            touchStartTime = Date.now();
        }, { passive: true });
        
        navbarCollapse.addEventListener('touchend', function(e) {
            const touchEndY = e.changedTouches[0].screenY;
            const touchEndTime = Date.now();
            const swipeDistance = touchEndY - touchStartY;
            const swipeTime = touchEndTime - touchStartTime;
            const swipeVelocity = swipeDistance / swipeTime;
            
            // Close if swiped down more than 80px OR fast swipe down (velocity > 0.5)
            if (isMenuOpen && (swipeDistance > 80 || (swipeDistance > 40 && swipeVelocity > 0.5))) {
                closeMenu();
            }
        }, { passive: true });
        
        // Also close when clicking on backdrop (the dark area behind menu)
        navbarCollapse.addEventListener('click', function(e) {
            // If click is directly on the collapse container (backdrop), not on menu items
            if (isMenuOpen && e.target === navbarCollapse) {
                closeMenu();
            }
        });
    }
    
    // Smooth scrolling with offset for fixed navbar
    function initSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (!targetId || targetId === '#') return;
                
                const targetSection = document.querySelector(targetId);
                if (!targetSection) return;
                
                e.preventDefault();
                
                const offsetTop = targetSection.offsetTop - 80;
                
                // Use Lenis if available, otherwise native smooth scroll
                if (window.SmoothScroll && window.SmoothScroll.lenis && window.SmoothScroll.lenis()) {
                    window.SmoothScroll.scrollTo(targetId);
                } else {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Track active link based on scroll position
    function initActiveLinkTracking() {
        const sections = document.querySelectorAll('section[id]');
        
        function updateActiveLink() {
            const scrollY = window.pageYOffset;
            let activeId = null;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    activeId = section.getAttribute('id');
                }
            });
            
            // Default to hero at top
            if (!activeId && scrollY < 100) {
                activeId = 'hero';
            }
            
            // Update active states
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${activeId}`) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                }
            });
        }
        
        // Throttled scroll listener
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    updateActiveLink();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        // Initial call
        updateActiveLink();
    }
});

// Skip link enhancement - hide after focus moves
document.addEventListener('DOMContentLoaded', function() {
    const skipLink = document.querySelector('.skip-link');
    if (!skipLink) return;
    
    skipLink.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.focus();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
