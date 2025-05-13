// Parallax scrolling effect
document.addEventListener('DOMContentLoaded', function() {
  const parallaxContainer = document.querySelector('.parallax-container');
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  const parallaxContent = document.querySelector('.parallax-content');
  
  // Initial setup for layers
  function setLayerStyles() {
    parallaxLayers.forEach(layer => {
      const speed = layer.getAttribute('data-speed');
      layer.style.transform = `translateZ(${speed * 100}px)`;
    });
    
    if (parallaxContent) {
      const contentSpeed = parallaxContent.getAttribute('data-speed');
      parallaxContent.style.transform = `translateZ(${contentSpeed * 100}px)`;
    }
  }
  
  setLayerStyles();
  
  // Parallax effect on mouse move
  function handleMouseMove(event) {
    if (!parallaxContainer) return;
    
    const xPos = (event.clientX / window.innerWidth - 0.5) * 2;
    const yPos = (event.clientY / window.innerHeight - 0.5) * 2;
    
    parallaxLayers.forEach(layer => {
      const speed = layer.getAttribute('data-speed');
      const x = xPos * 50 * speed;
      const y = yPos * 50 * speed;
      layer.style.transform = `translate3d(${x}px, ${y}px, ${speed * 100}px)`;
    });
    
    if (parallaxContent) {
      const contentSpeed = parallaxContent.getAttribute('data-speed');
      const x = xPos * 20 * contentSpeed;
      const y = yPos * 20 * contentSpeed;
      parallaxContent.style.transform = `translate3d(${x}px, ${y}px, ${contentSpeed * 100}px)`;
    }
  }
  
  // Add parallax effect on scroll
  function handleScroll() {
    const scrollPosition = window.pageYOffset;
    
    parallaxLayers.forEach(layer => {
      const speed = layer.getAttribute('data-speed');
      const yOffset = scrollPosition * speed;
      layer.style.transform = `translate3d(0, ${yOffset}px, ${speed * 100}px)`;
    });
  }
  
  // Split text animation
  function setupSplitText() {
    const splitTextElement = document.querySelector('.split-text');
    if (!splitTextElement) return;
    
    const text = splitTextElement.textContent;
    let html = '';
    
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        html += ' ';
      } else {
        html += `<span class="char" style="animation-delay: ${0.03 * i}s">${text[i]}</span>`;
      }
    }
    
    splitTextElement.innerHTML = html;
    
    const chars = document.querySelectorAll('.char');
    chars.forEach(char => {
      char.style.display = 'inline-block';
      char.style.opacity = '0';
      char.style.transform = 'translateY(20px)';
      char.style.animation = 'fadeInUp 0.5s forwards';
    });
  }
  
  // Use mouse parallax for desktop, scroll parallax for mobile
  function setupParallaxType() {
    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }
  
  setupParallaxType();
  setupSplitText();
  
  // Handle window resize
  window.addEventListener('resize', setupParallaxType);
  
  // Add smooth scrolling to anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});