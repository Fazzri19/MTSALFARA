document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class when element is in view
          if (entry.target.classList.contains('content')) {
            entry.target.style.animation = 'slideIn 1s forwards';
          }
          if (entry.target.classList.contains('image-container')) {
            entry.target.style.animation = 'slideInRight 1s forwards';
          }
          
          // Pulse animation for CTA button
          if (entry.target.classList.contains('cta-button')) {
            setInterval(() => {
              entry.target.style.transform = 'translateY(-5px)';
              setTimeout(() => {
                entry.target.style.transform = 'translateY(0)';
              }, 1000);
            }, 3000);
          }
        }
      });
    }, observerOptions);
  
    // Observe elements
    document.querySelectorAll('.content, .image-container, .cta-button').forEach(el => {
      observer.observe(el);
    });
  
    // CTA button hover effect enhancement
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    ctaButton.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Click effect for CTA button
    ctaButton.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(2px) scale(0.98)';
    });
    
    ctaButton.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-5px) scale(1.05)';
    });
  
    // Image hover effect
    const studentImage = document.querySelector('.student-image');
    
    studentImage.addEventListener('mouseenter', function() {
      // Create floating particles
      for (let i = 0; i < 10; i++) {
        createParticle(this.getBoundingClientRect());
      }
    });
    
    function createParticle(rect) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${rect.left + rect.width/2}px`;
      particle.style.top = `${rect.top + rect.height/2}px`;
      
      const size = Math.random() * 10 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      const colors = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      document.body.appendChild(particle);
      
      const animation = particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`, opacity: 0 }
      ], {
        duration: Math.random() * 1000 + 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });
      
      animation.onfinish = () => particle.remove();
    }
  });
  
  // Add particle styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .particle {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      z-index: 100;
      transform: translate(-50%, -50%);
      filter: blur(1px);
      animation: float-up 1s ease-out forwards;
    }
    
    @keyframes float-up {
      to {
        transform: translate(var(--tx), var(--ty)) scale(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);