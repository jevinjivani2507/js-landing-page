import { $, $$ } from '../core/utils.js';

export function initProcessTabs() {
  const tabs = $$('.process__tab');
  const panels = $$('.process__panel');
  const prevBtn = $('#processPrev');
  const nextBtn = $('#processNext');
  const indicator = $('#processIndicator');
  if (!tabs.length || !panels.length) return;

  let currentIndex = 0;

  function activate(index) {
    currentIndex = index;

    tabs.forEach((t) => {
      t.classList.remove('process__tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    panels.forEach((p) => {
      p.classList.remove('process__panel--active');
      p.hidden = true;
    });

    tabs[index].classList.add('process__tab--active');
    tabs[index].setAttribute('aria-selected', 'true');
    panels[index].hidden = false;
    panels[index].classList.add('process__panel--active');

    // Scroll active tab into view on tablet
    tabs[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    updateStepNav();
  }

  function updateStepNav() {
    if (indicator) {
      indicator.textContent = `Step ${currentIndex + 1}/${tabs.length}`;
    }
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === tabs.length - 1;
  }

  // Tab clicks
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(i));

    tab.addEventListener('keydown', (e) => {
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
        activate(newIndex);
      }
    });
  });

  // Mobile Previous/Next
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) activate(currentIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < tabs.length - 1) activate(currentIndex + 1);
    });
  }

  updateStepNav();
}
