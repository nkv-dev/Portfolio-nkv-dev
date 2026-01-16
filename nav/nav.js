// Mobile menu toggle functionality with iOS-style animations
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
    `;
    document.head.appendChild(style);
});