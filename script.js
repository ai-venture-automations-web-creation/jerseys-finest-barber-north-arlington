'use strict';
const header = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('navLinks');

// Sticky header
function handleScroll() { header.classList.toggle('scrolled', window.scrollY > 10); }
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// Mobile menu
let menuOpen = false;
function toggleMenu(open) {
  menuOpen = open;
  hamburger.classList.toggle('open', open);
  mobileNav.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}
hamburger.addEventListener('click', () => toggleMenu(!menuOpen));
mobileNav.querySelectorAll('a').forEach(l => l.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) toggleMenu(false); });

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.fade-in');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
}, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });
revealEls.forEach(el => obs.observe(el));

// Lazy images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.style.opacity = '0'; img.style.transition = 'opacity 0.5s ease';
  if (img.complete) { img.style.opacity = '1'; }
  else { img.addEventListener('load', () => { img.style.opacity = '1'; }); img.addEventListener('error', () => { img.style.opacity = '0.3'; }); }
});
