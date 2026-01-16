// ================= CHAOS BUBBLE ENGINE =================

class ChaosBubbleEngine {
  constructor() {
    this.bubbles = [];
    this.isRunning = false;
    
    // Physics parameters
    this.maxSpeed = 4; // Reduced for smoother movement
    this.chaseRadius = 200; // Distance to start chasing
    this.attackRadius = 80; // Distance to start attacking
    this.repulsionRadius = 60; // Distance to repel violently
    this.friction = 0.98; // Higher friction for smoother deceleration
    
    // Aggression levels
    this.baseAggression = 0.001; // Reduced for smoother movement
    this.chaseAggression = 0.04; // Reduced aggression
    this.attackAggression = 0.08; // Reduced attack force
    
    // Animation settings
    this.fps = 60;
    this.frameInterval = 1000 / this.fps;
    this.lastFrameTime = 0;
    
    // Uniform bubble size
    this.bubbleSize = 50;
    
    // Performance optimization for more bubbles
    this.maxChaosBubbles = 8; // Max bubbles affected by chaos injection
    
    this.init();
  }

  init() {
    // Find all bubble elements
    const bubbleElements = document.querySelectorAll('.bubble');
    
    bubbleElements.forEach((element, index) => {
      // Random starting position
      const x = Math.random() * (window.innerWidth - 50);
      const y = Math.random() * (window.innerHeight - 50);
      
      // Random starting velocity
      const vx = (Math.random() - 0.5) * 4;
      const vy = (Math.random() - 0.5) * 4;
      
      // Create bubble object
      const bubble = {
        element: element,
        id: index,
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        targetX: null,
        targetY: null,
        isAttacking: false,
        isChasing: false,
        lastAttackTime: 0,
        personality: Math.random(), // 0-1, affects behavior
        color: this.getRandomColor(),
        size: this.bubbleSize
      };
      
      this.bubbles.push(bubble);
      
      // Position bubble initially with hardware acceleration
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      element.style.width = `${this.bubbleSize}px`;
      element.style.height = `${this.bubbleSize}px`;
      
      // Add hover effect
      element.addEventListener('mouseenter', () => {
        this.createExplosion(bubble);
      });
    });
    
    // Start the chaos
    this.start();
  }

  getRandomColor() {
    const colors = [
      'rgba(255, 77, 77, 0.3)',
      'rgba(77, 255, 77, 0.3)', 
      'rgba(77, 77, 255, 0.3)',
      'rgba(255, 255, 77, 0.3)',
      'rgba(255, 77, 255, 0.3)',
      'rgba(77, 255, 255, 0.3)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
    
    // Add random chaos injection
    setInterval(() => {
      this.injectChaos();
    }, 3000);
  }

  animate(currentTime) {
    if (!this.isRunning) return;
    
    if (currentTime - this.lastFrameTime >= this.frameInterval) {
      this.updateBubbles();
      this.checkInteractions();
      this.render();
      this.lastFrameTime = currentTime;
    }
    
    requestAnimationFrame(this.animate.bind(this));
  }

  updateBubbles() {
    this.bubbles.forEach(bubble => {
      // Add smooth wandering with reduced force
      const wanderForce = 0.05;
      bubble.vx += (Math.random() - 0.5) * wanderForce;
      bubble.vy += (Math.random() - 0.5) * wanderForce;
      
      // Apply friction
      bubble.vx *= this.friction;
      bubble.vy *= this.friction;
      
      // Smooth speed limiting with easing
      const speed = Math.sqrt(bubble.vx * bubble.vx + bubble.vy * bubble.vy);
      if (speed > this.maxSpeed) {
        const easingFactor = 0.9;
        bubble.vx = bubble.vx * easingFactor + ((bubble.vx / speed) * this.maxSpeed) * (1 - easingFactor);
        bubble.vy = bubble.vy * easingFactor + ((bubble.vy / speed) * this.maxSpeed) * (1 - easingFactor);
      }
      
      // Update position with sub-pixel precision
      bubble.x += bubble.vx;
      bubble.y += bubble.vy;
      
      // Smooth boundary collision
      const margin = 10;
      if (bubble.x <= margin) {
        bubble.x = margin;
        bubble.vx = Math.abs(bubble.vx) * 0.7; // Gentle bounce
      } else if (bubble.x >= window.innerWidth - this.bubbleSize - margin) {
        bubble.x = window.innerWidth - this.bubbleSize - margin;
        bubble.vx = -Math.abs(bubble.vx) * 0.7;
      }
      
      if (bubble.y <= margin) {
        bubble.y = margin;
        bubble.vy = Math.abs(bubble.vy) * 0.7; // Gentle bounce
      } else if (bubble.y >= window.innerHeight - this.bubbleSize - margin) {
        bubble.y = window.innerHeight - this.bubbleSize - margin;
        bubble.vy = -Math.abs(bubble.vy) * 0.7;
      }
    });
  }

  checkInteractions() {
    // Optimized collision detection for more bubbles
    const len = this.bubbles.length;
    for (let i = 0; i < len; i++) {
      const bubble1 = this.bubbles[i];
      
      for (let j = i + 1; j < len; j++) {
        const bubble2 = this.bubbles[j];
        
        const dx = bubble2.x - bubble1.x;
        const dy = bubble2.y - bubble1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.repulsionRadius) {
          // VIOLENT REPULSION - ATTACK!
          this.applyRepulsion(bubble1, bubble2, distance);
          bubble1.isAttacking = true;
          bubble2.isAttacking = true;
          
          // Add attack effects (reduced frequency for performance)
          if (Date.now() - bubble1.lastAttackTime > 300) {
            this.createAttackEffect(bubble1, bubble2);
            bubble1.lastAttackTime = Date.now();
          }
        } else if (distance < this.attackRadius) {
          // AGGRESSIVE CHASE
          this.applyChase(bubble1, bubble2, distance);
          bubble1.isChasing = true;
          bubble2.isChasing = true;
        } else if (distance < this.chaseRadius) {
          // CURIOUS MOVEMENT
          this.applyCuriosity(bubble1, bubble2, distance);
        }
      }
    }
  }

  applyRepulsion(bubble1, bubble2, distance) {
    const dx = bubble2.x - bubble1.x;
    const dy = bubble2.y - bubble1.y;
    
    if (distance === 0) return; // Prevent division by zero
    
    // Normalize direction
    const nx = dx / distance;
    const ny = dy / distance;
    
    // Calculate smooth repulsion force
    const force = (1 - distance / this.repulsionRadius) * this.attackAggression;
    
    // Apply smooth opposite forces
    bubble1.vx -= nx * force * 5; // Reduced for smoothness
    bubble1.vy -= ny * force * 5;
    bubble2.vx += nx * force * 5;
    bubble2.vy += ny * force * 5;
    
    // Add gentle randomness
    bubble1.vx += (Math.random() - 0.5) * 1;
    bubble1.vy += (Math.random() - 0.5) * 1;
    bubble2.vx += (Math.random() - 0.5) * 1;
    bubble2.vy += (Math.random() - 0.5) * 1;
  }

  applyChase(bubble1, bubble2, distance) {
    const dx = bubble2.x - bubble1.x;
    const dy = bubble2.y - bubble1.y;
    
    if (distance === 0) return;
    
    const nx = dx / distance;
    const ny = dy / distance;
    
    // Smooth chase with personality influence
    const chaseForce1 = this.chaseAggression * (0.8 + bubble1.personality * 0.4);
    const chaseForce2 = this.chaseAggression * (0.8 + bubble2.personality * 0.4);
    
    // Apply smooth forces
    bubble1.vx += nx * chaseForce1;
    bubble1.vy += ny * chaseForce1;
    bubble2.vx -= nx * chaseForce2;
    bubble2.vy -= ny * chaseForce2;
  }

  applyCuriosity(bubble1, bubble2, distance) {
    // Gentle movement towards each other
    const dx = bubble2.x - bubble1.x;
    const dy = bubble2.y - bubble1.y;
    
    if (distance === 0) return;
    
    const nx = dx / distance;
    const ny = dy / distance;
    
    const curiosityForce = this.baseAggression;
    
    bubble1.vx += nx * curiosityForce * bubble1.personality;
    bubble1.vy += ny * curiosityForce * bubble1.personality;
  }

  injectChaos() {
    // Randomly select more bubbles for more chaos with 30 bubbles
    const numBubbles = 3 + Math.floor(Math.random() * 3); // 3-5 bubbles instead of 2-3
    const selectedBubbles = [];
    
    while (selectedBubbles.length < numBubbles && selectedBubbles.length < this.maxChaosBubbles) {
      const randomIndex = Math.floor(Math.random() * this.bubbles.length);
      if (!selectedBubbles.includes(randomIndex)) {
        selectedBubbles.push(randomIndex);
      }
    }
    
    selectedBubbles.forEach(index => {
      const bubble = this.bubbles[index];
      const angle = Math.random() * Math.PI * 2;
      const force = 2 + Math.random() * 3; // Reduced force for smoothness
      
      bubble.vx += Math.cos(angle) * force;
      bubble.vy += Math.sin(angle) * force;
      
      // Visual feedback
      this.createChaosEffect(bubble);
    });
  }

  createAttackEffect(bubble1, bubble2) {
    // Create collision particles (no screen shake)
    const midX = (bubble1.x + bubble2.x) / 2 + this.bubbleSize / 2;
    const midY = (bubble1.y + bubble2.y) / 2 + this.bubbleSize / 2;
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'collision-particle';
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: ${bubble1.color};
        border-radius: 50%;
        left: ${midX}px;
        top: ${midY}px;
        pointer-events: none;
        z-index: 1000;
        animation: particleFade 0.6s ease-out forwards;
      `;
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 600);
    }
    
    // NO SCREEN SHAKE - REMOVED for better UX
  }

  createBounceEffect(bubble) {
    bubble.element.style.transform = 'scale(1.3)';
    bubble.element.style.boxShadow = `0 0 20px ${bubble.color}`;
    
    setTimeout(() => {
      bubble.element.style.transform = '';
      bubble.element.style.boxShadow = '';
    }, 200);
  }

  createChaosEffect(bubble) {
    bubble.element.style.borderColor = 'rgba(255, 255, 0, 0.8)';
    setTimeout(() => {
      bubble.element.style.borderColor = '';
    }, 500);
  }

  createExplosion(bubble) {
    // Mouse hover explosion
    const numParticles = 12;
    const centerX = bubble.x + this.bubbleSize / 2;
    const centerY = bubble.y + this.bubbleSize / 2;
    
    for (let i = 0; i < numParticles; i++) {
      const angle = (Math.PI * 2 * i) / numParticles;
      const particle = document.createElement('div');
      
      particle.className = 'explosion-particle';
      particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: ${bubble.color};
        border-radius: 50%;
        left: ${centerX}px;
        top: ${centerY}px;
        pointer-events: none;
        z-index: 1000;
        animation: explodeParticle 0.8s ease-out forwards;
      `;
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
    
    // Push bubble away from mouse
    bubble.vx += (Math.random() - 0.5) * 15;
    bubble.vy += (Math.random() - 0.5) * 15;
  }

  render() {
    this.bubbles.forEach(bubble => {
      // Use hardware-accelerated sub-pixel positioning for ultra-smooth movement
      bubble.element.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0)`;
      
      // Visual states
      if (bubble.isAttacking) {
        bubble.element.style.borderColor = 'rgba(255, 0, 0, 0.8)';
        bubble.element.style.boxShadow = `0 0 30px rgba(255, 0, 0, 0.6)`;
        bubble.isAttacking = false;
      } else if (bubble.isChasing) {
        bubble.element.style.borderColor = 'rgba(255, 200, 0, 0.8)';
        bubble.element.style.boxShadow = `0 0 20px rgba(255, 200, 0, 0.4)`;
        bubble.isChasing = false;
      } else {
        bubble.element.style.borderColor = '';
        bubble.element.style.boxShadow = '';
      }
    });
  }

  destroy() {
    this.isRunning = false;
  }
}

// Add required CSS animations (NO SCREEN SHAKE)
const chaosStyles = document.createElement('style');
chaosStyles.textContent = `
  @keyframes particleFade {
    0% { 
      opacity: 1; 
      transform: scale(1) translate(0, 0);
    }
    100% { 
      opacity: 0; 
      transform: scale(0.5) translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px);
    }
  }
  
  @keyframes explodeParticle {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0) translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px);
    }
  }
  
  .bubble {
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  .collision-particle, .explosion-particle {
    pointer-events: none !important;
  }
`;
document.head.appendChild(chaosStyles);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wait for bubbles to be in DOM
  setTimeout(() => {
    window.chaosBubbles = new ChaosBubbleEngine();
  }, 100);
});

// Handle window resize
window.addEventListener('resize', function() {
  if (window.chaosBubbles) {
    window.chaosBubbles.destroy();
    setTimeout(() => {
      window.chaosBubbles = new ChaosBubbleEngine();
    }, 100);
  }
});