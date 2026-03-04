import { $, prefersReducedMotion } from '../core/utils.js';

export function initIndustriesCarousel() {
  const carousel = $('#industriesCarousel');
  const track = $('#industriesTrack');
  const leftBtn = $('#industriesLeft');
  const rightBtn = $('#industriesRight');
  if (!carousel || !track) return;

  const CARD_WIDTH = 320;
  const GAP = 24;
  const SCROLL_AMOUNT = CARD_WIDTH + GAP;
  const AUTO_SPEED = 0.5;

  let position = 0;
  let isPaused = false;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let rafId = null;

  const cards = [...track.children];
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
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
      rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
  }

  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      position += SCROLL_AMOUNT;
      if (position > 0) position = -totalWidth + SCROLL_AMOUNT;
      track.style.transition = 'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)';
      track.style.transform = `translateX(${position}px)`;
      setTimeout(() => { track.style.transition = ''; }, 400);
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      position -= SCROLL_AMOUNT;
      if (Math.abs(position) >= totalWidth) position += totalWidth;
      track.style.transition = 'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)';
      track.style.transform = `translateX(${position}px)`;
      setTimeout(() => { track.style.transition = ''; }, 400);
    });
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
