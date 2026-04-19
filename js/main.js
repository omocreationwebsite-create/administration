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
  // MOBILE MENU TOGGLE
  // ============================================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
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
  // NEWSLETTER FORM SUBMISSION
  // ============================================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      if (email) {
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
  // SCROLL ANIMATION FOR ELEMENTS
  // ============================================
  const animateElements = document.querySelectorAll('.service-card, .gallery-item, .info-card, .social-card');
  
  const fadeInOnScroll = function() {
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;
      
      if (elementPosition < screenPosition - 50) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial styles for animation elements
  animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll(); // Trigger once on load
  
  // ============================================
  // PREVENT DOUBLE SUBMISSION
  // ============================================
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 3000);
      }
    });
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
