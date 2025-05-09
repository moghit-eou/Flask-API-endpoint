document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  // Mouse position
  let mouse = {
    x: null,
    y: null,
    radius: 150 // Mouse influence radius
  };
  
  // Update mouse position
  window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });
  
  // Reset mouse position when out of canvas
  window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });
  
  // Particle class
  class Particle {
    constructor() {
      // Initial position
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      
      // Size
      this.size = Math.random() * 3 + 1;
      
      // Velocity
      this.vx = (Math.random() - 0.5) * 1;
      this.vy = (Math.random() - 0.5) * 1;
      
      // Colors
      this.color = `rgba(103, 232, 249, ${Math.random() * 0.5 + 0.5})`;
      
      // Visibility
      this.visible = true;
      this.visibilityTimer = 0;
      this.disappearTime = Math.floor(Math.random() * 200) + 100;
    }
    
    // Update particle position
    update() {
      // Handle visibility timing
      this.visibilityTimer++;
      
      // Toggle visibility randomly
      if (this.visibilityTimer > this.disappearTime) {
        this.visible = !this.visible;
        this.visibilityTimer = 0;
        this.disappearTime = Math.floor(Math.random() * 200) + (this.visible ? 500 : 100);
      }
      
      // Only update position if visible
      if (this.visible) {
        // Check for mouse proximity
        if (mouse.x !== undefined && mouse.y !== undefined) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Influence particle movement based on mouse position
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            // Push particles away from cursor
            this.vx -= forceDirectionX * force * 0.6;
            this.vy -= forceDirectionY * force * 0.6;
          }
        }
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Boundary checks
        if (this.x < 0 || this.x > canvas.width) {
          this.vx = -this.vx;
        }
        
        if (this.y < 0 || this.y > canvas.height) {
          this.vy = -this.vy;
        }
      }
    }
    
    // Draw particle
    draw() {
      if (this.visible) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
  }
  
  // Create particles array
  const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
  let particles = [];
  
  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  // Connect particles with lines
  function connectParticles() {
    const maxDistance = 150;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        if (!particles[i].visible || !particles[j].visible) continue;
        
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          // Draw line between particles
          const opacity = 1 - (distance / maxDistance);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(103, 232, 249, ${opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Animation loop
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw each particle
    for (const particle of particles) {
      particle.update();
      particle.draw();
    }
    
    // Connect particles with lines
    connectParticles();
    
    // Request next frame
    requestAnimationFrame(animate);
  }
  
  // Initialize and start animation
  initParticles();
  animate();
});