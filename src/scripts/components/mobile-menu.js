import { $, $$ } from '../core/utils.js';

export function initMobileMenu() {
  const mainBtn = $('#hamburgerBtn');
  const stickyBtn = $('#hamburgerBtn-sticky');
  const closeBtn = $('#mobileMenuClose');
  const overlay = $('#mobileMenu');
  if (!overlay) return;

  const links = $$('.navbar__link', overlay);
  const btns = [mainBtn, stickyBtn].filter(Boolean);
  let isOpen = false;

  function open() {
    isOpen = true;
    btns.forEach((b) => {
      b.classList.add('is-active');
      b.setAttribute('aria-expanded', 'true');
    });
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    isOpen = false;
    btns.forEach((b) => {
      b.classList.remove('is-active');
      b.setAttribute('aria-expanded', 'false');
    });
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  btns.forEach((b) => {
    b.addEventListener('click', () => {
      isOpen ? close() : open();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', close);
  }

  links.forEach((link) => {
    link.addEventListener('click', close);
  });

  overlay.querySelector('.btn')?.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close();
  });
}
