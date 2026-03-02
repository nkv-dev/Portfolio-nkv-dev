// Scroll Utils - No offset, section top = window top
(function() {
  'use strict';

  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return false;

    // No offset - section top aligns with window top
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    return true;
  }

  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        smoothScrollTo(href);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
  } else {
    initSmoothScroll();
  }

  window.smoothScrollUtils = { smoothScrollTo };
})();
