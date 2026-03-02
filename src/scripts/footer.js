/***************************
 * FOOTER FUNCTIONALITY
 ***************************/

// Get dynamic navbar offset
function getNavbarOffset() {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.main-nav');
  
  if (!header || !nav) return 80;
  
  const navRect = nav.getBoundingClientRect();
  return Math.ceil(navRect.bottom);
}

// Back to top button functionality
function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (!backToTopButton) return;
  
  // Smooth scroll to top when clicked
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Keyboard accessibility
  backToTopButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
}

// Footer link smooth scrolling
function initFooterLinks() {
  const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');
  
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offset = getNavbarOffset();
        const offsetTop = targetSection.offsetTop - offset;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Footer animation on scroll
function initFooterAnimations() {
  const footerElements = document.querySelectorAll('.footer-brand, .footer-links, .footer-social');
  
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  footerElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    footerObserver.observe(element);
  });
}

// Social links hover effects
function initFooterSocialLinks() {
  const socialLinks = document.querySelectorAll('.footer-social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) rotate(5deg) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotate(0) scale(1)';
    });
    
    // Add ripple effect on click
    link.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Current year update for copyright
function updateCopyrightYear() {
  const copyrightElement = document.querySelector('.copyright');
  if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.innerHTML = `© ${currentYear} Nitesh Kumar Verma. All rights reserved.`;
  }
}

// Initialize footer functionality
document.addEventListener('DOMContentLoaded', function() {
  initBackToTop();
  initFooterLinks();
  initFooterAnimations();
  initFooterSocialLinks();
  updateCopyrightYear();
});

// Add ripple effect styles
const rippleStyles = `
  .footer-social-link {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .footer-link.active {
    color: var(--tech-primary);
    font-weight: 500;
  }
  
  .footer-link.active::before {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Inject ripple styles
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);
