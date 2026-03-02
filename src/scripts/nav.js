// Mobile-Optimized Navbar - Fast & Simple
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.site-header');
  
  if (!navToggle || !navMenu) return;
  
  let isMenuOpen = false;
  
  // Get dynamic navbar offset
  function getNavbarOffset() {
    const nav = document.querySelector('.main-nav');
    if (!nav || !header) return 80;
    const navRect = nav.getBoundingClientRect();
    return Math.ceil(navRect.bottom);
  }
  
  // Toggle menu
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    navToggle.setAttribute('aria-expanded', isMenuOpen);
    navMenu.classList.toggle('active', isMenuOpen);
    
    // Simple haptic
    if (isMenuOpen && navigator.vibrate) {
      navigator.vibrate(8);
    }
  }
  
  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    }
  }
  
  // Toggle click
  navToggle.addEventListener('click', function(e) {
    e.preventDefault();
    toggleMenu();
  });
  
  // Close menu + smooth scroll when clicking nav links
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        // Close menu first
        closeMenu();
        
        // No offset - section top aligns with window top
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Close on outside click
  document.addEventListener('click', function(e) {
    if (isMenuOpen && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      closeMenu();
    }
  });
  
  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });
  
  // Active link on scroll - OPTIMIZED
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const offset = getNavbarOffset();
    const scrollY = window.pageYOffset + offset;
    
    let current = '';
    
    sections.forEach(function(section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });
    
    if (!current && scrollY < 200) {
      current = 'hero';
    }
    
    navLinks.forEach(function(link) {
      const isActive = link.getAttribute('href') === '#' + current;
      link.classList.toggle('active', isActive);
    });
  }
  
  // Throttled scroll - RAF
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
  
  // Update on resize (navbar height may change)
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      updateActiveLink();
    }, 100);
  });
  
  // Initial
  updateActiveLink();
});

// Skip link
document.addEventListener('DOMContentLoaded', function() {
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const main = document.getElementById('main-content');
      if (main) {
        const header = document.querySelector('.site-header');
        const nav = document.querySelector('.main-nav');
        const offset = nav ? Math.ceil(nav.getBoundingClientRect().bottom) : 80;
        
        window.scrollTo({
          top: main.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
  }
});
