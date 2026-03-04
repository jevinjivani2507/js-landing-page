import { prefersReducedMotion, easeOutCubic } from './utils.js';

export function animate(element, keyframes, options = {}) {
  if (prefersReducedMotion()) {
    const lastFrame = keyframes[keyframes.length - 1];
    Object.assign(element.style, lastFrame);
    return null;
  }

  const defaults = {
    duration: 600,
    easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
    fill: 'forwards',
  };

  return element.animate(keyframes, { ...defaults, ...options });
}

export function fadeInUp(element, options = {}) {
  return animate(
    element,
    [
      { opacity: 0, transform: 'translateY(24px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 600, ...options }
  );
}

export function fadeIn(element, options = {}) {
  return animate(
    element,
    [
      { opacity: 0 },
      { opacity: 1 },
    ],
    { duration: 400, ...options }
  );
}

export function slideDown(element, options = {}) {
  return animate(
    element,
    [
      { transform: 'translateY(-100%)' },
      { transform: 'translateY(0)' },
    ],
    { duration: 400, ...options }
  );
}

export function countTo(element, target, options = {}) {
  if (prefersReducedMotion()) {
    element.textContent = target + '+';
    return;
  }

  const { duration = 2000, suffix = '+' } = options;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const current = Math.round(eased * target);

    element.textContent = current.toLocaleString() + (progress >= 1 ? suffix : '');

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
