import { $, throttle } from '../core/utils.js';

export function initStickyHeader() {
  const hero = $('#hero');
  const sticky = $('#stickyHeader');
  if (!hero || !sticky) return;

  let lastScroll = 0;
  let isVisible = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting && window.scrollY > 0) {
        show();
      } else {
        hide();
      }
    },
    { threshold: 0 }
  );

  observer.observe(hero);

  function show() {
    if (isVisible) return;
    isVisible = true;
    sticky.classList.add('is-visible');
    sticky.setAttribute('aria-hidden', 'false');
  }

  function hide() {
    if (!isVisible) return;
    isVisible = false;
    sticky.classList.remove('is-visible');
    sticky.setAttribute('aria-hidden', 'true');
  }

  const handleScroll = throttle(() => {
    const current = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight;

    if (current <= heroBottom) {
      hide();
      lastScroll = current;
      return;
    }

    if (current > lastScroll && current > heroBottom + 100) {
      hide();
    } else if (current < lastScroll) {
      show();
    }

    lastScroll = current;
  }, 60);

  window.addEventListener('scroll', handleScroll, { passive: true });
}
