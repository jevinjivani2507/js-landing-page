import { $, prefersReducedMotion } from '../core/utils.js';

export function initTestimonialsCarousel() {
  const carousel = $('#testimonialsCarousel');
  const track = carousel?.querySelector('.testimonials__track');
  if (!carousel || !track || track.children.length === 0) return;

  const AUTO_SPEED = 0.4;
  const BUFFER = 400;

  let position = 0;
  let isPaused = false;
  let isDragging = false;
  let startX = 0;
  let dragStartPos = 0;

  function gap() {
    return parseFloat(getComputedStyle(track).gap) || 24;
  }

  function stepOf(card) {
    return card.offsetWidth + gap();
  }

  function firstIsOffScreen() {
    const el = track.firstElementChild;
    if (!el) return false;
    return el.getBoundingClientRect().right <= carousel.getBoundingClientRect().left;
  }

  function lastIsNearViewport() {
    const el = track.lastElementChild;
    if (!el) return false;
    return el.getBoundingClientRect().left < carousel.getBoundingClientRect().right + BUFFER;
  }

  function recycleFirst() {
    const el = track.firstElementChild;
    if (!el) return;
    position += stepOf(el);
    track.appendChild(el);
  }

  function recycleLast() {
    const el = track.lastElementChild;
    if (!el) return;
    position -= stepOf(el);
    track.insertBefore(el, track.firstElementChild);
  }

  // --- Auto-scroll via rAF ---
  function tick() {
    if (!isPaused && !isDragging) {
      position -= AUTO_SPEED;
      track.style.transform = `translateX(${position}px)`;
    }

    if (!isDragging) {
      if (firstIsOffScreen() && lastIsNearViewport()) {
        recycleFirst();
        track.style.transform = `translateX(${position}px)`;
      }

      if (position > 0) {
        recycleLast();
        track.style.transform = `translateX(${position}px)`;
      }
    }

    requestAnimationFrame(tick);
  }

  if (!prefersReducedMotion()) requestAnimationFrame(tick);

  // --- Interaction: hover, mouse-drag, touch-drag ---
  carousel.addEventListener('mouseenter', () => { isPaused = true; });
  carousel.addEventListener('mouseleave', () => { isPaused = false; });

  carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    dragStartPos = position;
    carousel.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    position = dragStartPos + (e.pageX - startX);
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
    dragStartPos = position;
  }, { passive: true });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    position = dragStartPos + (e.touches[0].pageX - startX);
    track.style.transform = `translateX(${position}px)`;
  }, { passive: true });

  carousel.addEventListener('touchend', () => {
    isDragging = false;
    isPaused = false;
  });
}
