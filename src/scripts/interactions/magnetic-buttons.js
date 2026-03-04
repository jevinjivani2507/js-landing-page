import { $$, prefersReducedMotion, lerp } from '../core/utils.js';

export function initMagneticButtons() {
  if (prefersReducedMotion()) return;

  const buttons = $$('.magnetic');
  const STRENGTH = 0.3;
  const INNER_STRENGTH = 0.15;

  buttons.forEach((btn) => {
    let bounds;

    btn.addEventListener('mouseenter', () => {
      bounds = btn.getBoundingClientRect();
    });

    btn.addEventListener('mousemove', (e) => {
      if (!bounds) return;

      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;

      btn.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;

      const inner = btn.querySelector('span') || btn;
      if (inner !== btn) {
        inner.style.transform = `translate(${x * INNER_STRENGTH}px, ${y * INNER_STRENGTH}px)`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      const inner = btn.querySelector('span');
      if (inner) inner.style.transform = '';
      bounds = null;
    });
  });
}
