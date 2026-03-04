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
  let isTransitioning = false;
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
      if (!isPaused && !isDragging && !isTransitioning) {
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

  function smoothJump(newPosition) {
    isTransitioning = true;
    position = newPosition;
    track.style.transition = 'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)';
    track.style.transform = `translateX(${position}px)`;
    track.addEventListener('transitionend', function handler() {
      track.removeEventListener('transitionend', handler);
      track.style.transition = '';
      isTransitioning = false;
    });
  }

  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      if (isTransitioning) return;
      let next = position + SCROLL_AMOUNT;
      if (next > 0) next = -totalWidth + SCROLL_AMOUNT;
      smoothJump(next);
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      if (isTransitioning) return;
      let next = position - SCROLL_AMOUNT;
      if (Math.abs(next) >= totalWidth) next += totalWidth;
      smoothJump(next);
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
