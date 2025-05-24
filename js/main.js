document.addEventListener('DOMContentLoaded', function() {
  // ===== Preloader =====
  window.addEventListener('load', function() {
    document.querySelector('.preloader').style.display = 'none';
  });

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // ===== Smooth Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Active Link Highlighting =====
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  function activateNavLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', activateNavLink);
  activateNavLink(); // Run once on load

  // ===== Header Scroll Effect =====
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ===== Back to Top Button =====
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===== Typing Animation =====
  const typingText = document.getElementById('typing-text');
  const phrases = [
    "Data Scientist", 
    "AI Engineer", 
    "Technical Advisor",
    "Python Developer",
    "Machine Learning Expert"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      isEnd = true;
      setTimeout(() => {
        isDeleting = true;
      }, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    const speed = isDeleting ? 100 : isEnd ? 100 : 150;
    setTimeout(type, speed);
  }

  // Start typing animation
  type();

  // ===== Animate on Scroll Initialization =====
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 150
  });

  // ===== Set Current Year in Footer =====
  document.getElementById('year').textContent = new Date().getFullYear();

  // ===== Contact Form Handling =====
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For now, we'll just log it and show a success message
      console.log({ name, email, subject, message });
      
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  // ===== Project Filtering (if needed) =====
  // This can be implemented later if you want to add filtering by project type
});