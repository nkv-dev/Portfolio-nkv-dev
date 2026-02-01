/***************************
 * CONTACT SECTION FUNCTIONALITY
 * Modern Interactive Contact Form & Features
 ***************************/

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all contact features
  initContactForm();
  initCharacterCounter();
  init3DTilt();
  initEmailCopy();
  initTypingEffect();
  initSocialLinks();
  initFormValidation();
  initScrollAnimations();
  initMouseGlow();
});

/***************************
 * CONTACT FORM HANDLING
 ***************************/

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnIcon.style.display = 'none';
    btnLoader.style.display = 'flex';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success!
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Add confetti effect
        createConfetti();
        
        // Reset form after delay
        setTimeout(() => {
          form.reset();
          document.getElementById('charCount').textContent = '0';
          form.style.display = 'flex';
          successMessage.style.display = 'none';
          submitBtn.disabled = false;
          btnText.style.display = 'inline';
          btnIcon.style.display = 'inline';
          btnLoader.style.display = 'none';
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form error:', error);
      errorMessage.style.display = 'block';
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnIcon.style.display = 'inline';
      btnLoader.style.display = 'none';
    }
  });
}

// Simple confetti effect
function createConfetti() {
  const colors = ['#ef4444', '#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6'];
  const container = document.querySelector('.contact-form-card');
  
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 2px;
      pointer-events: none;
      z-index: 1000;
      left: 50%;
      top: 50%;
    `;
    container.appendChild(confetti);
    
    // Animate
    const angle = (Math.PI * 2 * i) / 30;
    const velocity = 100 + Math.random() * 100;
    const x = Math.cos(angle) * velocity;
    const y = Math.sin(angle) * velocity - 100;
    
    confetti.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${x}px, ${y}px) rotate(360deg)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => confetti.remove();
  }
}

/***************************
 * CHARACTER COUNTER
 ***************************/

function initCharacterCounter() {
  const textarea = document.getElementById('message');
  const counter = document.getElementById('charCount');
  if (!textarea || !counter) return;

  textarea.addEventListener('input', function() {
    const length = this.value.length;
    const max = 1000;
    counter.textContent = length;
    
    // Update visual state
    const counterEl = counter.parentElement;
    counterEl.classList.remove('warning', 'danger');
    
    if (length > max * 0.8) {
      counterEl.classList.add('warning');
    }
    if (length >= max) {
      counterEl.classList.remove('warning');
      counterEl.classList.add('danger');
    }
  });
}

/***************************
 * 3D TILT EFFECT
 ***************************/

function init3DTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  
  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      this.style.setProperty('--rotateX', `${rotateX}deg`);
      this.style.setProperty('--rotateY', `${rotateY}deg`);
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
}

/***************************
 * EMAIL COPY FUNCTIONALITY
 ***************************/

function initEmailCopy() {
  // Global function for onclick handlers
  window.copyContactEmail = function(email, element) {
    navigator.clipboard.writeText(email).then(() => {
      // Update icon
      const icon = element.querySelector('#copyIcon');
      if (icon) {
        icon.className = 'bi bi-check2';
        icon.style.color = '#22c55e';
        
        setTimeout(() => {
          icon.className = 'bi bi-clipboard';
          icon.style.color = '';
        }, 2000);
      }
      
      // Show toast
      showToast('Email copied to clipboard!');
      
      // Highlight the element
      element.style.borderColor = '#22c55e';
      setTimeout(() => {
        element.style.borderColor = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      showToast('Failed to copy email', true);
    });
  };
}

function showToast(message, isError = false) {
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = toast.querySelector('i');
  
  toastMessage.textContent = message;
  
  if (isError) {
    toast.style.background = '#ef4444';
    toast.style.boxShadow = '0 10px 30px rgba(239, 68, 68, 0.3)';
    toastIcon.className = 'bi bi-x-circle-fill';
  } else {
    toast.style.background = '#22c55e';
    toast.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.3)';
    toastIcon.className = 'bi bi-check-circle-fill';
  }
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/***************************
 * TYPING EFFECT
 ***************************/

function initTypingEffect() {
  const title = document.getElementById('contactTitle');
  if (!title) return;
  
  const text = title.textContent;
  title.textContent = '';
  title.style.opacity = '1';
  
  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      title.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, 50);
}

/***************************
 * SOCIAL LINKS INTERACTIONS
 ***************************/

function initSocialLinks() {
  const socialLinks = document.querySelectorAll('.contact-social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
    
    // 3D rotation effect
    link.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      this.style.transform = `translateY(-5px) scale(1.1) rotateX(${y * -0.3}deg) rotateY(${x * 0.3}deg)`;
    });
  });
}

/***************************
 * FORM VALIDATION
 ***************************/

function initFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  const inputs = form.querySelectorAll('.form-input, .form-textarea');
  
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
  });
}

function validateField(e) {
  const field = e.target;
  const formGroup = field.closest('.form-group');
  
  // Remove previous error
  formGroup.classList.remove('error');
  
  // Validate
  let isValid = true;
  
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
  }
  
  if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
    }
  }
  
  if (!isValid) {
    formGroup.classList.add('error');
    // Shake animation
    formGroup.style.animation = 'none';
    setTimeout(() => {
      formGroup.style.animation = 'shake 0.5s ease';
    }, 10);
  }
  
  return isValid;
}

function clearError(e) {
  const formGroup = e.target.closest('.form-group');
  formGroup.classList.remove('error');
}

/***************************
 * SCROLL ANIMATIONS
 ***************************/

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements
  const animatedElements = document.querySelectorAll('.contact-info-card, .contact-form-card, .contact-method');
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

/***************************
 * MOUSE GLOW EFFECT
 ***************************/

function initMouseGlow() {
  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  const cards = document.querySelectorAll('.contact-info-card, .contact-form-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const glow = this.querySelector('.contact-glow, .form-glow');
      if (glow) {
        glow.style.left = `${x - rect.width}px`;
        glow.style.top = `${y - rect.height}px`;
      }
    });
  });
}

/***************************
 * UTILITY FUNCTIONS
 ***************************/

// Validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Handle mailto links
function initMailtoLinks() {
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const email = this.href.replace('mailto:', '');
      if (!validateEmail(email)) {
        e.preventDefault();
        console.warn('Invalid email address:', email);
      }
    });
  });
}

// Initialize mailto validation
document.addEventListener('DOMContentLoaded', initMailtoLinks);

// Keyboard accessibility for email copy
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    const focused = document.activeElement;
    if (focused.classList.contains('contact-method') && focused.onclick) {
      e.preventDefault();
      focused.click();
    }
  }
});

// Availability status rotation (optional)
function rotateAvailabilityStatus() {
  const badge = document.getElementById('availabilityBadge');
  const text = badge.querySelector('.availability-text');
  
  const statuses = [
    { text: 'Open to Work', color: '#22c55e' },
    { text: 'Available for Freelance', color: '#22c55e' },
    { text: 'Looking for Internships', color: '#3b82f6' }
  ];
  
  let currentIndex = 0;
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % statuses.length;
    const status = statuses[currentIndex];
    
    text.style.opacity = '0';
    
    setTimeout(() => {
      text.textContent = status.text;
      badge.style.borderColor = status.color;
      badge.style.background = `${status.color}15`;
      text.style.color = status.color;
      badge.querySelector('.pulse-dot').style.background = status.color;
      text.style.opacity = '1';
    }, 300);
  }, 5000);
}

// Uncomment to enable status rotation
// document.addEventListener('DOMContentLoaded', rotateAvailabilityStatus);
