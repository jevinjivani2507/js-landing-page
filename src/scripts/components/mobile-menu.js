import { $, $$ } from '../core/utils.js';

export function initMobileMenu() {
  const btn = $('#hamburgerBtn');
  const overlay = $('#mobileMenu');
  if (!btn || !overlay) return;

  const links = $$('.navbar__link', overlay);
  let isOpen = false;

  function open() {
    isOpen = true;
    btn.classList.add('is-active');
    btn.setAttribute('aria-expanded', 'true');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    isOpen = false;
    btn.classList.remove('is-active');
    btn.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    isOpen ? close() : open();
  });

  links.forEach((link) => {
    link.addEventListener('click', close);
  });

  overlay.querySelector('.btn')?.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close();
  });
}
