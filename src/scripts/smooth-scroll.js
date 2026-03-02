// Scroll Utils - Unified smooth scroll with dynamic navbar offset
(function() {
  'use strict';

  // Get dynamic navbar offset
  function getNavbarOffset() {
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('.main-nav');
    
    if (!header || !nav) return 80;
    
    const headerRect = header.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    
    // Calculate actual height from top of viewport
    return Math.ceil(navRect.bottom);
  }

  // Smooth scroll to target with dynamic offset
  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return false;

    const offset = getNavbarOffset();
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    return true;
  }

  // Initialize all anchor link scrolling
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip empty anchors and hash links without target
        if (!href || href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        smoothScrollTo(href);
      });
    });
  }

  // Update CSS custom property for scroll-margin-top
  function updateScrollMargin() {
    const offset = getNavbarOffset();
    document.documentElement.style.setProperty('--scroll-offset', offset + 'px');
    
    // Update scroll-margin-top for all sections
    document.querySelectorAll('section[id]').forEach(section => {
      section.style.scrollMarginTop = offset + 'px';
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initSmoothScroll();
      updateScrollMargin();
    });
  } else {
    initSmoothScroll();
    updateScrollMargin();
  }

  // Update on resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      updateScrollMargin();
    }, 100);
  });

  // Expose for external use
  window.smoothScrollUtils = {
    smoothScrollTo: smoothScrollTo,
    getNavbarOffset: getNavbarOffset,
    updateScrollMargin: updateScrollMargin
  };
})();
