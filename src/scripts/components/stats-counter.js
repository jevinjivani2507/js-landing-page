import { $, prefersReducedMotion } from '../core/utils.js';

export function initTestimonialsCarousel() {
  const carousel = $('#testimonialsCarousel');
  const track = carousel?.querySelector('.testimonials__track');
  if (!carousel || !track) return;

  const CARD_WIDTH = 340;
  const GAP = 24;
  const AUTO_SPEED = 0.4;

  let position = 0;
  let isPaused = false;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const cards = [...track.children];
  cards.forEach((card) => {
    track.appendChild(card.cloneNode(true));
  });

  const totalWidth = cards.length * (CARD_WIDTH + GAP);

  function autoScroll() {
    if (prefersReducedMotion()) return;

    function step() {
      if (!isPaused && !isDragging) {
        position -= AUTO_SPEED;
        if (Math.abs(position) >= totalWidth) {
          position += totalWidth;
        }
        track.style.transform = `translateX(${position}px)`;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  carousel.addEventListener('mouseenter', () => { isPaused = true; });
  carousel.addEventListener('mouseleave', () => { isPaused = false; });

  carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollLeft = position;
    carousel.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    position = scrollLeft + dx;
    track.style.transform = `translateX(${position}px)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    carousel.style.cursor = 'grab';
  });

  carousel.addEventListener('touchstart', (e) => {
    isPaused = true;
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollLeft = position;
  }, { passive: true });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].pageX - startX;
    position = scrollLeft + dx;
    track.style.transform = `translateX(${position}px)`;
  }, { passive: true });

  carousel.addEventListener('touchend', () => {
    isDragging = false;
    isPaused = false;
  });

  autoScroll();
}
