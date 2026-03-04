import { $$, prefersReducedMotion } from '../core/utils.js';
import { observeElements } from '../core/observer.js';

export function initScrollReveal() {
  if (prefersReducedMotion()) {
    $$('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  observeElements('.reveal', (el) => {
    el.classList.add('is-visible');
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
    once: true,
  });
}
