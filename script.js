// Reveal elements as they enter view
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.3 });
revealEls.forEach(el => revealObserver.observe(el));

// Track which slide is active + update the waterline dock
const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.waterline-dots .dot'));
const fill = document.getElementById('waterlineFill');
const deck = document.getElementById('deck');

const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = slides.indexOf(entry.target);
      dots.forEach(d => d.classList.remove('active'));
      if (dots[idx]) dots[idx].classList.add('active');
      const pct = slides.length > 1 ? (idx / (slides.length - 1)) * 100 : 0;
      fill.style.height = pct + '%';
    }
  });
}, { threshold: 0.6, root: deck });

slides.forEach(s => slideObserver.observe(s));