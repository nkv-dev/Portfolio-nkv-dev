// Mobile-Optimized Navbar - Fast & Simple
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!navToggle || !navMenu) return;
  
  let isMenuOpen = false;
  
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
  
  // Close on link click
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      closeMenu();
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
    const scrollY = window.pageYOffset + 100;
    
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
        main.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
