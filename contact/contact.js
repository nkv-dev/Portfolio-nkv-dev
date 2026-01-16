/***************************
 * CONTACT SECTION FUNCTIONALITY
 ***************************/

// Copy email functionality
function copyEmail() {
  const emailElement = event.currentTarget.querySelector('.email-address');
  const email = emailElement.textContent;
  
  // Create temporary textarea for copying
  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = email;
  tempTextarea.style.position = 'absolute';
  tempTextarea.style.left = '-9999px';
  document.body.appendChild(tempTextarea);
  
  // Select and copy
  tempTextarea.select();
  document.execCommand('copy');
  
  // Remove temporary element
  document.body.removeChild(tempTextarea);
  
  // Show feedback
  showCopyFeedback(event.currentTarget);
}

// Show visual feedback when email is copied
function showCopyFeedback(element) {
  const copyIcon = element.querySelector('.copy-icon');
  const originalIcon = copyIcon.className;
  
  // Change to checkmark
  copyIcon.className = 'bi bi-check2';
  copyIcon.style.color = '#1aff8c';
  
  // Animate the container
  element.style.background = 'rgba(26, 255, 140, 0.1)';
  element.style.borderColor = 'rgba(26, 255, 140, 0.3)';
  
  // Reset after 2 seconds
  setTimeout(() => {
    copyIcon.className = originalIcon;
    copyIcon.style.color = '';
    element.style.background = '';
    element.style.borderColor = '';
  }, 2000);
}

// Animate availability status
function animateAvailabilityStatus() {
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.querySelector('.status-text');
  
  if (!statusDot || !statusText) return;
  
  // Simulate status changes (optional - can be removed for static status)
  const statuses = [
    { text: 'Open to opportunities', color: '#1aff8c' },
    { text: 'Available for freelance', color: 'var(--tech-primary)' },
    { text: 'Responding within 24h', color: '#1aff8c' }
  ];
  
  let currentIndex = 0;
  
  // Change status every 10 seconds (optional)
  setInterval(() => {
    currentIndex = (currentIndex + 1) % statuses.length;
    const status = statuses[currentIndex];
    
    statusText.style.opacity = '0';
    
    setTimeout(() => {
      statusText.textContent = status.text;
      statusDot.style.background = status.color;
      statusDot.style.boxShadow = `0 0 8px ${status.color}80`;
      statusText.style.opacity = '1';
    }, 300);
  }, 10000);
}

// Social links hover effects
function initSocialLinks() {
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotate(0)';
    });
  });
}

// Initialize contact section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Load contact information from config
  loadContactInfo();
  
  // Initialize animations
  animateAvailabilityStatus();
  initSocialLinks();
  
  // Add smooth scroll behavior to contact links
  const contactLinks = document.querySelectorAll('a[href^="#"]');
  contactLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add intersection observer for contact section animations
  const contactObserver = new IntersectionObserver((entries) => {
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
  
  // Observe contact info panels
  const contactPanels = document.querySelectorAll('.contact-info');
  contactPanels.forEach(panel => {
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(30px)';
    panel.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    contactObserver.observe(panel);
  });
});

// Load contact information from configuration
function loadContactInfo() {
  // Check if config is available
  if (typeof window.ContactConfig === 'undefined') {
    console.warn('Contact configuration not loaded. Using default values.');
    return;
  }
  
  const config = window.ContactConfig;
  
  // Update email addresses
  const personalEmail = document.getElementById('personalEmail');
  const professionalEmail = document.getElementById('professionalEmail');
  const academicEmail = document.getElementById('academicEmail');
  
  if (personalEmail) personalEmail.textContent = config.personalEmail;
  if (professionalEmail) professionalEmail.textContent = config.professionalEmail;
  if (academicEmail) academicEmail.textContent = config.academicEmail;
  
  // Update social links
  const socialLinks = document.querySelectorAll('#socialLinks [data-social]');
  socialLinks.forEach(link => {
    const socialType = link.getAttribute('data-social');
    if (config.socialLinks[socialType]) {
      if (socialType === 'email') {
        link.href = `mailto:${config.personalEmail}`;
      } else {
        link.href = config.socialLinks[socialType];
      }
    }
  });
  
  // Update status
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const responseTime = document.getElementById('responseTime');
  const location = document.getElementById('location');
  
  if (statusText) statusText.textContent = config.availability.status;
  if (responseTime) responseTime.textContent = config.availability.responseTime;
  if (location) location.textContent = config.location;
  
  if (statusDot && config.availability.color) {
    statusDot.style.background = config.availability.color;
    statusDot.style.boxShadow = `0 0 8px ${config.availability.color}80`;
  }
  
  // Update footer social links as well
  const footerSocialLinks = document.querySelectorAll('.footer-social-link');
  footerSocialLinks.forEach(link => {
    const icon = link.querySelector('i');
    if (icon) {
      if (icon.classList.contains('bi-github') && config.socialLinks.github) {
        link.href = config.socialLinks.github;
      } else if (icon.classList.contains('bi-linkedin') && config.socialLinks.linkedin) {
        link.href = config.socialLinks.linkedin;
      } else if (icon.classList.contains('bi-twitter-x') && config.socialLinks.twitter) {
        link.href = config.socialLinks.twitter;
      } else if (icon.classList.contains('bi-envelope')) {
        link.href = `mailto:${config.personalEmail}`;
      }
    }
  });
}

// Add keyboard accessibility
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    const focusedElement = document.activeElement;
    if (focusedElement.classList.contains('email-container')) {
      e.preventDefault();
      copyEmail();
    }
  }
});

// Email validation for mailto links
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Handle email link clicks
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const email = this.href.replace('mailto:', '');
    if (!validateEmail(email)) {
      e.preventDefault();
      console.warn('Invalid email address:', email);
    }
  });
});