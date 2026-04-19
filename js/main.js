// ============================================
// O.M.Ocreation - Main JavaScript
// Luxury Stone Fashion Website
// Version: 2.0
// ============================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // PRELOADER
  // ============================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
    }, 1500);
  }
  
  // ============================================
  // AOS INITIALIZATION (Scroll Animations)
  // ============================================
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out'
  });
  
  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
  
  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // ============================================
  // PARTICLES BACKGROUND FOR HERO
  // ============================================
  function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 10 + 5}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      particlesContainer.appendChild(particle);
    }
  }
  
  // Add particle animation keyframes dynamically
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes floatParticle {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(styleSheet);
  
  createParticles();
  
  // ============================================
  // NEWSLETTER FORM SUBMISSION
  // ============================================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      if (email) {
        // Store in localStorage or send to your backend
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        this.reset();
      }
    });
  }
  
  // ============================================
  // ADD ACTIVE CLASS TO CURRENT PAGE NAV LINK
  // ============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('active');
    }
  });
  
  // ============================================
  // IMAGE LAZY LOADING
  // ============================================
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '1';
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    imageObserver.observe(img);
  });
  
  // ============================================
  // COUNTER ANIMATION FOR STATS
  // ============================================
  const counters = document.querySelectorAll('.stat-number');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.innerText);
    let current = 0;
    const increment = target / 50;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  };
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
  
  // ============================================
  // PARALLAX EFFECT ON SCROLL
  // ============================================
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
  
  // ============================================
  // WHATSAPP FLOATING BUTTON TOOLTIP
  // ============================================
  const whatsappFloat = document.getElementById('whatsappFloat');
  if (whatsappFloat) {
    let tooltipTimeout;
    whatsappFloat.addEventListener('mouseenter', () => {
      clearTimeout(tooltipTimeout);
    });
    whatsappFloat.addEventListener('mouseleave', () => {
      tooltipTimeout = setTimeout(() => {
        const tooltip = document.querySelector('.whatsapp-tooltip');
        if (tooltip) tooltip.style.opacity = '0';
      }, 100);
    });
  }
  
  // ============================================
  // PREVENT DOUBLE SUBMISSION
  // ============================================
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || 'Subscribe <i class="fas fa-paper-plane"></i>';
        }, 3000);
      }
    });
    
    // Store original button text
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn && !submitBtn.getAttribute('data-original-text')) {
      submitBtn.setAttribute('data-original-text', submitBtn.innerHTML);
    }
  });
  
  // ============================================
  // CONSOLE WELCOME MESSAGE
  // ============================================
  console.log('%c✨ O.M.Ocreation - Luxury Stone Fashion ✨', 'color: #ff4da6; font-size: 16px; font-weight: bold;');
  console.log('%cWhere elegance meets craftsmanship', 'color: #ff85c1; font-size: 12px;');
  console.log('%cFollow us on Instagram: @o.m.ocreations', 'color: #833AB4; font-size: 12px;');
  
});

// ============================================
// WINDOW LOAD EVENT
// ============================================
window.addEventListener('load', function() {
  // Reveal images after load
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    }
  });
  
  // Remove preloader if still visible
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('hide')) {
    setTimeout(() => {
      preloader.classList.add('hide');
    }, 500);
  }
});
