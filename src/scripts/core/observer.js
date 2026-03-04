const observerCache = new Map();

export function createObserver(callback, options = {}) {
  const {
    root = null,
    rootMargin = '0px 0px -80px 0px',
    threshold = 0.1,
    once = true,
  } = options;

  const key = `${rootMargin}-${threshold}-${once}`;

  if (observerCache.has(key)) {
    return observerCache.get(key);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target, entry);
        if (once) observer.unobserve(entry.target);
      }
    });
  }, { root, rootMargin, threshold });

  observerCache.set(key, observer);
  return observer;
}

export function observeElements(selector, callback, options = {}) {
  const elements = typeof selector === 'string'
    ? document.querySelectorAll(selector)
    : selector;

  const observer = createObserver(callback, options);

  elements.forEach((el) => observer.observe(el));

  return () => {
    elements.forEach((el) => observer.unobserve(el));
  };
}
