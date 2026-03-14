/* ============================================================
   CODESYL - script.js
   Handles: navbar scroll, mobile menu, scroll reveal, form
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar: shadow on scroll ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ---- Hamburger menu toggle ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---- Scroll Reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger siblings in the same parent
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- Contact Form ---- */
  const form     = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#name')?.value?.trim() || '';
      const email = form.querySelector('#email')?.value?.trim() || '';
      const message = form.querySelector('#message')?.value?.trim() || '';

      const subject = encodeURIComponent('New Project Inquiry - Codesyl');
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      const mailto = `mailto:azharhamim80@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
    });
  }

  /* ---- Smooth Scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
