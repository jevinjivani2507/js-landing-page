import { $$ } from '../core/utils.js';

export function initModals() {
  const triggers = $$('[data-modal-open]');
  const overlays = $$('.modal-overlay');

  function open(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstInput = overlay.querySelector('input, select, textarea');
    if (firstInput) setTimeout(() => firstInput.focus(), 300);
  }

  function close(overlay) {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function closeAll() {
    overlays.forEach(close);
  }

  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      open(btn.dataset.modalOpen);
    });
  });

  overlays.forEach((overlay) => {
    overlay.querySelectorAll('[data-modal-close]').forEach((btn) => {
      btn.addEventListener('click', () => close(overlay));
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close(overlay);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}
