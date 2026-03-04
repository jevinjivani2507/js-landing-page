import { $, throttle } from '../core/utils.js';

export function initStickyHeader() {
  const navbar = $('#navbar');
  const sticky = $('#stickyHeader');
  if (!navbar || !sticky) return;

  let lastScroll = 0;
  const THRESHOLD = 5;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        sticky.classList.add('is-visible');
        sticky.setAttribute('aria-hidden', 'false');
      } else {
        sticky.classList.remove('is-visible');
        sticky.setAttribute('aria-hidden', 'true');
      }
    },
    { rootMargin: '-77px 0px 0px 0px', threshold: 0 }
  );

  observer.observe(navbar);

  const handleScroll = throttle(() => {
    const current = window.scrollY;
    if (Math.abs(current - lastScroll) < THRESHOLD) return;

    if (current > lastScroll && current > 400) {
      sticky.classList.remove('is-visible');
    } else if (current < lastScroll) {
      const navbarRect = navbar.getBoundingClientRect();
      if (navbarRect.bottom < 0) {
        sticky.classList.add('is-visible');
      }
    }

    lastScroll = current;
  }, 50);

  window.addEventListener('scroll', handleScroll, { passive: true });
}
