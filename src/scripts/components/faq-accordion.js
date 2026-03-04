import { $$ } from '../core/utils.js';

export function initFaqAccordion() {
  const items = $$('.faq__item');
  if (!items.length) return;

  items.forEach((item) => {
    const btn = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq__item--active');

      items.forEach((other) => {
        if (other === item) return;
        other.classList.remove('faq__item--active');
        const otherBtn = other.querySelector('.faq__question');
        const otherAnswer = other.querySelector('.faq__answer');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherAnswer) otherAnswer.style.maxHeight = '0';
      });

      if (isOpen) {
        item.classList.remove('faq__item--active');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('faq__item--active');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  const firstAnswer = items[0]?.querySelector('.faq__answer');
  if (firstAnswer) {
    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
  }
}
