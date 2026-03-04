import { $$ } from '../core/utils.js';

export function initSmoothScroll() {
  const links = $$('a[href^="#"]');
  const HEADER_OFFSET = 80;

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

      window.scrollTo({
        top,
        behavior: 'smooth',
      });

      history.replaceState(null, '', href);
    });
  });
}
