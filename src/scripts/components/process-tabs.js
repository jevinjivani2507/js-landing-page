import { $, $$ } from '../core/utils.js';

export function initProcessTabs() {
  const tabs = $$('.process__tab');
  const panels = $$('.process__panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;

      tabs.forEach((t) => {
        t.classList.remove('process__tab--active');
        t.setAttribute('aria-selected', 'false');
      });

      panels.forEach((p) => {
        p.classList.remove('process__panel--active');
        p.hidden = true;
      });

      tab.classList.add('process__tab--active');
      tab.setAttribute('aria-selected', 'true');

      const target = $(`#${targetId}`);
      if (target) {
        target.hidden = false;
        target.classList.add('process__panel--active');
      }
    });

    tab.addEventListener('keydown', (e) => {
      const currentIndex = tabs.indexOf(tab);
      let newIndex;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = tabs.length - 1;
      }

      if (newIndex !== undefined) {
        tabs[newIndex].focus();
        tabs[newIndex].click();
      }
    });
  });
}
