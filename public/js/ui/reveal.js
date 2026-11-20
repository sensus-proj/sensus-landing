/**
 * Revelado progresivo al hacer scroll.
 * Si el usuario prefiere menos movimiento o no hay IntersectionObserver,
 * no se oculta nada (el contenido siempre queda visible).
 */
const SELECTORS = [
  '.sensus-footer .container',
  '.how__eyebrow',
  '.how__title',
  '.how__card',
  '.page-header-clean',
  '.info-card-clean',
  '.step-card-clean',
  '.contact-card-white',
  '.contact-card-peach',
  '.legal-accordion-box',
  '.notice-warning',
];

export function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll(SELECTORS.join(','));
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  targets.forEach((el, index) => {
    el.setAttribute('data-reveal', '');
    el.style.setProperty('--reveal-delay', `${(index % 4) * 80}ms`);
    observer.observe(el);
  });

  document.documentElement.classList.add('js-reveal');
}
