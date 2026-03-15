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

  /* ---- Hero rotating word ---- */
  const rotatingWord = document.getElementById('rotatingWord');
  if (rotatingWord) {
    const words = ['Website', 'Software', 'Design'];
    let idx = 0;
    const transitionDuration = 550;
    const holdDuration = 1800;
    const cycleDuration = transitionDuration + holdDuration;

    setInterval(() => {
      rotatingWord.classList.add('exit-left');
      setTimeout(() => {
        idx = (idx + 1) % words.length;
        rotatingWord.textContent = words[idx];
        rotatingWord.classList.remove('exit-left');
        rotatingWord.classList.add('enter-right');
        setTimeout(() => {
          rotatingWord.classList.remove('enter-right');
        }, transitionDuration);
      }, transitionDuration);
    }, cycleDuration);
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
