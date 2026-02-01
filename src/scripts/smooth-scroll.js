// Mobile-Optimized Smooth Scroll - Uses Native API
(function() {
  // Check if mobile (touch device)
  const isMobile = window.matchMedia('(pointer: coarse)').matches;
  const isTouch = 'ontouchstart' in window;
  
  // Skip heavy Lenis on mobile - use native smooth scroll
  if (isMobile || isTouch) {
    console.log('Mobile detected: Using native smooth scroll');
    
    // Simple smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // Calculate offset for fixed navbar
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          
          // Native smooth scroll
          window.scrollTo({
            top: top,
            behavior: 'smooth'
          });
        }
      });
    });
    
    return; // Don't load Lenis
  }
  
  // Desktop: Use Lenis for buttery smooth scroll
  let lenis;
  
  function initLenis() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;
    
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false
      });
      
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      
      requestAnimationFrame(raf);
      
      // Handle anchor links
      document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const target = document.querySelector(targetId);
          if (target && lenis) {
            e.preventDefault();
            
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            lenis.scrollTo(targetPosition, {
              offset: 0,
              duration: 1.5
            });
          }
        });
      });
      
      console.log('Lenis initialized (desktop)');
    } catch (err) {
      console.log('Lenis not available, using native scroll');
    }
  }
  
  // Init after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLenis);
  } else {
    setTimeout(initLenis, 100);
  }
  
  // Export
  window.SmoothScroll = {
    scrollTo: function(selector) {
      const el = document.querySelector(selector);
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { offset: -80 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
})();
