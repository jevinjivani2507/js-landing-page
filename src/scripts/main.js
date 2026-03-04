import { initStickyHeader } from './components/sticky-header.js';
import { initMobileMenu } from './components/mobile-menu.js';
import { initHeroCarousel } from './components/hero-carousel.js';
import { initFaqAccordion } from './components/faq-accordion.js';
import { initIndustriesCarousel } from './components/industries-carousel.js';
import { initProcessTabs } from './components/process-tabs.js';
import { initTestimonialsCarousel } from './components/stats-counter.js';

import { initScrollReveal } from './interactions/scroll-reveal.js';
import { initMagneticButtons } from './interactions/magnetic-buttons.js';
import { initParallax } from './interactions/parallax.js';
import { initHoverTilt } from './interactions/hover-tilt.js';
import { initSmoothScroll } from './interactions/smooth-scroll.js';

function generateNoise() {
  const el = document.getElementById('noise-overlay');
  if (!el) return;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 200;
  canvas.height = 200;
  const imageData = ctx.createImageData(200, 200);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() * 255;
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  el.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
}

function init() {
  generateNoise();
  initStickyHeader();
  initMobileMenu();
  initHeroCarousel();
  initFaqAccordion();
  initProcessTabs();

  initScrollReveal();
  initSmoothScroll();

  initIndustriesCarousel();
  initTestimonialsCarousel();

  initMagneticButtons();
  initParallax();
  initHoverTilt();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
