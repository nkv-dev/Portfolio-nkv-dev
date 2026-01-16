// ================= BUBBLE PHYSICS ENGINE =================

class BubblePhysics {
  constructor() {
    this.bubbles = [];
    this.proximityThreshold = 120; // pixels between bubble centers
    this.lastFrameTime = 0;
    this.targetFPS = 60;
    this.frameInterval = 1000 / this.targetFPS;
    this.spatialGrid = new Map();
    this.gridSize = 100;
    
    this.baseAnimations = {
      bubble1: { pattern: 'circular', speed: 15, radius: 30, centerX: 0.1, centerY: 0.15 },
      bubble2: { pattern: 'zigzag', speed: 18, amplitude: 40, centerX: 0.9, centerY: 0.2 },
      bubble3: { pattern: 'wave', speed: 20, frequency: 0.02, centerX: 0.2, centerY: 0.3 },
      bubble4: { pattern: 'figure8', speed: 16, size: 35, centerX: 0.8, centerY: 0.4 },
      bubble5: { pattern: 'random', speed: 22, centerX: 0.3, centerY: 0.5 },
      bubble6: { pattern: 'spiral', speed: 19, radius: 25, centerX: 0.7, centerY: 0.6 },
      bubble7: { pattern: 'bounce', speed: 21, amplitude: 30, centerX: 0.4, centerY: 0.7 },
      bubble8: { pattern: 'drift', speed: 17, drift: 'horizontal', centerX: 0.6, centerY: 0.8 },
      bubble9: { pattern: 'orbital', speed: 23, radius: 40, centerX: 0.5, centerY: 0.25 },
      bubble10: { pattern: 'sway', speed: 24, amplitude: 25, centerX: 0.9, centerY: 0.35 },
      bubble11: { pattern: 'pulse', speed: 14, scale: 1.2, centerX: 0.15, centerY: 0.65 },
      bubble12: { pattern: 'loop', speed: 20, path: 'square', centerX: 0.85, centerY: 0.5 },
      bubble13: { pattern: 'elastic', speed: 18, elasticity: 0.8, centerX: 0.25, centerY: 0.75 },
      bubble14: { pattern: 'tumble', speed: 16, rotation: 360, centerX: 0.75, centerY: 0.85 },
      bubble15: { pattern: 'wander', speed: 22, randomness: 0.6, centerX: 0.35, centerY: 0.9 }
    };
    
    this.init();
  }

  init() {
    // Initialize all bubbles
    for (let i = 1; i <= 15; i++) {
      const bubble = document.querySelector(`.bubble-${i}`);
      if (bubble) {
        const config = this.baseAnimations[`bubble${i}`];
        
        // Set initial position
        this.setBubblePosition(bubble, config);
        
        // Store bubble data
        this.bubbles.push({
          element: bubble,
          id: i,
          config: config,
          x: config.centerX * (window.innerWidth - 50),
          y: config.centerY * (window.innerHeight - 50),
          vx: 0,
          vy: 0,
          isRepelling: false
        });
        
        // Start base animation
        this.startBaseAnimation(bubble, i);
      }
    }
    
    // Start physics engine
    this.animate();
    
    // Start collision detection
    this.startCollisionDetection();
    
    // Start random motion enhancer
    this.startRandomMotion();
  }

  setBubblePosition(bubble, config) {
    const x = config.centerX * (window.innerWidth - 50);
    const y = config.centerY * (window.innerHeight - 50);
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    bubble.dataset.x = x;
    bubble.dataset.y = y;
  }

  startBaseAnimation(bubble, id) {
    const config = this.baseAnimations[`bubble${id}`];
    bubble.style.animation = `bubbleBase${id} ${config.speed}s ease-in-out infinite`;
    
    // Create base animation keyframes dynamically
    this.createDynamicKeyframes(id, config);
  }

  createDynamicKeyframes(id, config) {
    const keyframes = this.generateKeyframes(config);
    let styleSheet = document.querySelector('#dynamic-keyframes');
    
    if (!styleSheet) {
      styleSheet = document.createElement('style');
      styleSheet.id = 'dynamic-keyframes';
      document.head.appendChild(styleSheet);
    }
    
    styleSheet.textContent += keyframes;
  }

  generateKeyframes(config) {
    let keyframes = '';
    
    switch (config.pattern) {
      case 'circular':
        keyframes = this.generateCircularKeyframes(config);
        break;
      case 'zigzag':
        keyframes = this.generateZigzagKeyframes(config);
        break;
      case 'wave':
        keyframes = this.generateWaveKeyframes(config);
        break;
      case 'figure8':
        keyframes = this.generateFigure8Keyframes(config);
        break;
      case 'random':
        keyframes = this.generateRandomKeyframes(config);
        break;
      case 'spiral':
        keyframes = this.generateSpiralKeyframes(config);
        break;
      case 'bounce':
        keyframes = this.generateBounceKeyframes(config);
        break;
      case 'drift':
        keyframes = this.generateDriftKeyframes(config);
        break;
      case 'orbital':
        keyframes = this.generateOrbitalKeyframes(config);
        break;
      case 'sway':
        keyframes = this.generateSwayKeyframes(config);
        break;
      case 'pulse':
        keyframes = this.generatePulseKeyframes(config);
        break;
      case 'loop':
        keyframes = this.generateLoopKeyframes(config);
        break;
      case 'elastic':
        keyframes = this.generateElasticKeyframes(config);
        break;
      case 'tumble':
        keyframes = this.generateTumbleKeyframes(config);
        break;
      case 'wander':
        keyframes = this.generateWanderKeyframes(config);
        break;
      default:
        keyframes = this.generateCircularKeyframes(config);
    }
    
    return keyframes;
  }

  // Keyframe generators for each pattern
  generateCircularKeyframes(config) {
    return `
      @keyframes bubbleBaseCircular {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(${config.radius}px, -${config.radius}px) rotate(90deg); }
        50% { transform: translate(-${config.radius}px, ${config.radius}px) rotate(180deg); }
        75% { transform: translate(${config.radius}px, ${config.radius}px) rotate(270deg); }
      }
    `;
  }

  generateZigzagKeyframes(config) {
    return `
      @keyframes bubbleBaseZigzag {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(${config.amplitude}px, -${config.amplitude/2}px) rotate(45deg); }
        50% { transform: translate(-${config.amplitude}px, ${config.amplitude}px) rotate(-45deg); }
        75% { transform: translate(${config.amplitude/2}px, -${config.amplitude}px) rotate(30deg); }
      }
    `;
  }

  generateWaveKeyframes(config) {
    return `
      @keyframes bubbleBaseWave {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(20px, ${Math.sin(config.frequency * Math.PI) * 15}px) rotate(5deg); }
        75% { transform: translate(-20px, ${Math.sin(config.frequency * Math.PI * 1.5) * 10}px) rotate(-5deg); }
      }
    `;
  }

  generateFigure8Keyframes(config) {
    return `
      @keyframes bubbleBaseFigure8 {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(${config.size}px, 0) rotate(90deg); }
        50% { transform: translate(${config.size}px, ${config.size}px) rotate(180deg); }
        75% { transform: translate(0, ${config.size}px) rotate(270deg); }
        100% { transform: translate(-${config.size}px, 0) rotate(360deg); }
      }
    `;
  }

  generateRandomKeyframes(config) {
    return `
      @keyframes bubbleBaseRandom {
        0% { transform: translate(0, 0) rotate(0deg) scale(1); }
        33% { transform: translate(${Math.random() * 40}px, ${Math.random() * -30}px) rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.4}); }
        66% { transform: translate(${-Math.random() * 30}px, ${Math.random() * 35}px) rotate(${Math.random() * -360}deg) scale(${0.9 + Math.random() * 0.3}); }
        100% { transform: translate(0, 0) rotate(0deg) scale(1); }
      }
    `;
  }

  generateSpiralKeyframes(config) {
    return `
      @keyframes bubbleBaseSpiral {
        0% { transform: rotate(0deg) translate(0, 0); }
        25% { transform: rotate(90deg) translate(${config.radius}px, 0); }
        50% { transform: rotate(180deg) translate(0, ${config.radius}px); }
        75% { transform: rotate(270deg) translate(-${config.radius}px, 0); }
        100% { transform: rotate(360deg) translate(0, 0); }
      }
    `;
  }

  generateBounceKeyframes(config) {
    return `
      @keyframes bubbleBaseBounce {
        0%, 100% { transform: translateY(0) scaleY(1); }
        10% { transform: translateY(-${config.amplitude}px) scaleY(0.8); }
        20% { transform: translateY(0) scaleY(1.2); }
        30% { transform: translateY(-${config.amplitude * 0.7}px) scaleY(0.9); }
        40% { transform: translateY(0) scaleY(1); }
      }
    `;
  }

  generateDriftKeyframes(config) {
    return `
      @keyframes bubbleBaseDrift {
        0%, 100% { transform: translateX(0) translateY(0); }
        25% { transform: translateX(${config.drift === 'horizontal' ? 30 : 0}px) translateY(-10px); }
        50% { transform: translateX(${config.drift === 'horizontal' ? -30 : 0}px) translateY(5px); }
        75% { transform: translateX(0) translateY(-5px); }
      }
    `;
  }

  generateOrbitalKeyframes(config) {
    return `
      @keyframes bubbleBaseOrbital {
        0% { transform: rotate(0deg) translateX(${config.radius}px); }
        25% { transform: rotate(90deg) translateX(0); }
        50% { transform: rotate(180deg) translateX(-${config.radius}px); }
        75% { transform: rotate(270deg) translateX(0); }
        100% { transform: rotate(360deg) translateX(${config.radius}px); }
      }
    `;
  }

  generateSwayKeyframes(config) {
    return `
      @keyframes bubbleBaseSway {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(${config.amplitude}px) rotate(10deg); }
        50% { transform: translateX(-${config.amplitude}px) rotate(-10deg); }
        75% { transform: translateX(${config.amplitude/2}px) rotate(5deg); }
      }
    `;
  }

  generatePulseKeyframes(config) {
    return `
      @keyframes bubbleBasePulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(${config.scale}) rotate(5deg); }
        50% { transform: scale(1) rotate(0deg); }
        75% { transform: scale(${config.scale}) rotate(-5deg); }
      }
    `;
  }

  generateLoopKeyframes(config) {
    const positions = [
      'translate(0, 0)',
      'translate(30px, 0)',
      'translate(30px, 30px)',
      'translate(0, 30px)',
      'translate(-30px, 30px)',
      'translate(-30px, 0)',
      'translate(-30px, -30px)',
      'translate(0, -30px)'
    ];
    
    let keyframes = '@keyframes bubbleBaseLoop {';
    positions.forEach((pos, i) => {
      keyframes += `${Math.round(i * 100 / positions.length)}% { transform: ${pos}; }`;
    });
    keyframes += '}';
    
    return keyframes;
  }

  generateElasticKeyframes(config) {
    return `
      @keyframes bubbleBaseElastic {
        0%, 100% { transform: scale(1) translateY(0); }
        30% { transform: scale(${config.elasticity}) translateY(-10px); }
        60% { transform: scale(1.2) translateY(5px); }
        80% { transform: scale(${config.elasticity}) translateY(-5px); }
      }
    `;
  }

  generateTumbleKeyframes(config) {
    return `
      @keyframes bubbleBaseTumble {
        0% { transform: rotate(0deg) translateY(0); }
        25% { transform: rotate(90deg) translateY(-10px); }
        50% { transform: rotate(180deg) translateY(5px); }
        75% { transform: rotate(270deg) translateY(-8px); }
        100% { transform: rotate(360deg) translateY(0); }
      }
    `;
  }

  generateWanderKeyframes(config) {
    return `
      @keyframes bubbleBaseWander {
        0% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(${Math.random() * 50 * config.randomness}px, ${Math.random() * -30 * config.randomness}px) rotate(${Math.random() * 180}deg); }
        66% { transform: translate(${-Math.random() * 40 * config.randomness}px, ${Math.random() * 35 * config.randomness}px) rotate(${-Math.random() * 180}deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
    `;
  }

  // Proximity detection and collision handling
  startCollisionDetection() {
    setInterval(() => {
      this.checkProximity();
    }, 100); // Check every 100ms
  }

  checkProximity() {
    for (let i = 0; i < this.bubbles.length; i++) {
      for (let j = i + 1; j < this.bubbles.length; j++) {
        const distance = this.calculateDistance(
          this.bubbles[i], 
          this.bubbles[j]
        );
        
        if (distance < this.proximityThreshold) {
          this.handleCollision(this.bubbles[i], this.bubbles[j], distance);
        }
      }
    }
  }

  calculateDistance(bubble1, bubble2) {
    const dx = bubble1.x - bubble2.x;
    const dy = bubble1.y - bubble2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  handleCollision(bubble1, bubble2, distance) {
    if (bubble1.isRepelling || bubble2.isRepelling) return;
    
    // Mark as repelling to prevent infinite loops
    bubble1.isRepelling = true;
    bubble2.isRepelling = true;
    
    // Calculate repulsion force
    const repulsionForce = (this.proximityThreshold - distance) / this.proximityThreshold;
    const angle = Math.atan2(bubble2.y - bubble1.y, bubble2.x - bubble1.x);
    
    const pushX = Math.cos(angle) * repulsionForce * 15;
    const pushY = Math.sin(angle) * repulsionForce * 15;
    
    // Apply repulsion forces
    this.applyRepulsion(bubble1, -pushX, -pushY);
    this.applyRepulsion(bubble2, pushX, pushY);
    
    // Visual feedback
    this.addVisualFeedback(bubble1);
    this.addVisualFeedback(bubble2);
    
    // Reset repel state after animation
    setTimeout(() => {
      bubble1.isRepelling = false;
      bubble2.isRepelling = false;
      this.removeVisualFeedback(bubble1);
      this.removeVisualFeedback(bubble2);
    }, 400);
  }

  applyRepulsion(bubble, forceX, forceY) {
    const currentTransform = getComputedStyle(bubble.element).transform;
    const currentX = this.extractX(currentTransform);
    const currentY = this.extractY(currentTransform);
    
    const newX = currentX + forceX;
    const newY = currentY + forceY;
    
    // Apply boundaries
    const boundedX = Math.max(0, Math.min(newX, window.innerWidth - 50));
    const boundedY = Math.max(0, Math.min(newY, window.innerHeight - 50));
    
    bubble.x = boundedX;
    bubble.y = boundedY;
    bubble.element.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
  }

  extractX(transform) {
    const match = transform.match(/translate\(([-\d.]+)px/);
    return match ? parseFloat(match[1]) : 0;
  }

  extractY(transform) {
    const match = transform.match(/translate\([-\d.]+px,\s*([-\d.]+)px\)/);
    return match ? parseFloat(match[2]) : 0;
  }

  addVisualFeedback(bubble) {
    bubble.element.classList.add('repelling');
  }

  removeVisualFeedback(bubble) {
    bubble.element.classList.remove('repelling');
  }

  // Random motion enhancer
  startRandomMotion() {
    setInterval(() => {
      this.addRandomPush();
    }, 3000); // Add random pushes every 3 seconds
  }

  addRandomPush() {
    const randomBubble = this.bubbles[Math.floor(Math.random() * this.bubbles.length)];
    const randomForce = (Math.random() - 0.5) * 20;
    const randomAngle = Math.random() * Math.PI * 2;
    
    const pushX = Math.cos(randomAngle) * randomForce;
    const pushY = Math.sin(randomAngle) * randomForce;
    
    this.applyRepulsion(randomBubble, pushX, pushY);
  }

  // Animation loop
  animate(currentTime) {
    if (currentTime - this.lastFrameTime >= this.frameInterval) {
      this.updateBubbles();
      this.lastFrameTime = currentTime;
    }
    
    requestAnimationFrame(this.animate.bind(this));
  }

  updateBubbles() {
    // Update stored positions
    this.bubbles.forEach(bubble => {
      const rect = bubble.element.getBoundingClientRect();
      bubble.x = rect.left + 25; // Center of bubble
      bubble.y = rect.top + 25;
    });
  }

  // Enhanced boundary checking
  checkBoundaries(bubble) {
    const rect = bubble.element.getBoundingClientRect();
    const margin = 20;
    
    // Bounce off edges
    if (rect.left < margin || rect.right > window.innerWidth - margin) {
      this.bounceHorizontal(bubble);
    }
    
    if (rect.top < margin || rect.bottom > window.innerHeight - margin) {
      this.bounceVertical(bubble);
    }
  }

  bounceHorizontal(bubble) {
    const rect = bubble.element.getBoundingClientRect();
    const currentTransform = getComputedStyle(bubble.element).transform;
    const currentY = this.extractY(currentTransform);
    
    if (rect.left < 20) {
      bubble.x = 20;
      bubble.element.style.transform = `translate(20px, ${currentY}px)`;
    } else if (rect.right > window.innerWidth - 20) {
      bubble.x = window.innerWidth - 70;
      bubble.element.style.transform = `translate(${window.innerWidth - 70}px, ${currentY}px)`;
    }
  }

  bounceVertical(bubble) {
    const rect = bubble.element.getBoundingClientRect();
    const currentTransform = getComputedStyle(bubble.element).transform;
    const currentX = this.extractX(currentTransform);
    
    if (rect.top < 20) {
      bubble.y = 20;
      bubble.element.style.transform = `translate(${currentX}px, 20px)`;
    } else if (rect.bottom > window.innerHeight - 20) {
      bubble.y = window.innerHeight - 70;
      bubble.element.style.transform = `translate(${currentX}px, ${window.innerHeight - 70}px)`;
    }
  }

  // Mobile optimization
  optimizeForMobile() {
    if (window.innerWidth < 768) {
      this.proximityThreshold = 80; // Smaller on mobile
      this.frameInterval = 1000 / 30; // Lower FPS on mobile
    }
  }

  // Clean up
  destroy() {
    this.bubbles.forEach(bubble => {
      bubble.element.classList.remove('repelling');
    });
    
    const styleSheet = document.querySelector('#dynamic-keyframes');
    if (styleSheet) {
      styleSheet.remove();
    }
  }
}

// Enhanced CSS styles
const enhancedBubbleStyles = `
  .bubble.repelling {
    animation-play-state: paused !important;
    border-color: rgba(255, 150, 77, 0.8) !important;
    box-shadow: 0 12px 30px rgba(255, 150, 77, 0.8) !important;
    transform: scale(1.2) !important;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
  }
`;

// Add enhanced styles to document
const styleElement = document.createElement('style');
styleElement.textContent = enhancedBubbleStyles;
document.head.appendChild(styleElement);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.bubblePhysics = new BubblePhysics();
});

// Handle window resize
window.addEventListener('resize', function() {
  if (window.bubblePhysics) {
    window.bubblePhysics.destroy();
    setTimeout(() => {
      window.bubblePhysics = new BubblePhysics();
    }, 100);
  }
});