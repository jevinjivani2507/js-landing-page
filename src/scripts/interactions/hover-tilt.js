import { $$, prefersReducedMotion } from '../core/utils.js';

export function initHoverTilt() {
  if (prefersReducedMotion()) return;

  const cards = $$('.tilt-card');
  const MAX_TILT = 4;
  const PERSPECTIVE = 800;

  cards.forEach((card) => {
    let bounds;
    let rafId;

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
    });

    card.addEventListener('mousemove', (e) => {
      if (!bounds) return;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX - bounds.left) / bounds.width;
        const y = (e.clientY - bounds.top) / bounds.height;

        const rotateX = (0.5 - y) * MAX_TILT;
        const rotateY = (x - 0.5) * MAX_TILT;

        card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      cancelAnimationFrame(rafId);
      card.style.transform = '';
      bounds = null;
    });
  });
}
