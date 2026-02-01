// Simple Smooth Scroll - Works on ALL devices
(function() {
  'use strict';
  
  function initSmoothScroll() {
    // Get all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip empty anchors
        if (!href || href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        // Calculate position with offset for fixed navbar
        const navbarHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        // Smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
    
    console.log('Smooth scroll initialized');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
  } else {
    initSmoothScroll();
  }
})();
