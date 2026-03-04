import { $, prefersReducedMotion, raf } from '../core/utils.js';

export function initParallax() {
  if (prefersReducedMotion()) return;

  const hero = $('#hero');
  if (!hero) return;

  const gallery = hero.querySelector('.hero__gallery');
  const content = hero.querySelector('.hero__content');
  if (!gallery && !content) return;

  const FACTOR_GALLERY = 0.04;
  const FACTOR_CONTENT = 0.02;

  const handleScroll = raf(() => {
    const scrollY = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight;

    if (scrollY > heroBottom) return;

    if (gallery) {
      gallery.style.transform = `translateY(${scrollY * FACTOR_GALLERY}px)`;
    }
    if (content) {
      content.style.transform = `translateY(${scrollY * FACTOR_CONTENT}px)`;
    }
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
}
