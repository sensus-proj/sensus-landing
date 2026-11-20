/**
 * Divide el título del hero en palabras para animarlas una a una.
 * Usa nodos DOM (sin innerHTML). Si el usuario prefiere menos movimiento,
 * el texto se deja intacto.
 */
export function initHeroTitleSplit() {
  const title = document.querySelector('.hero-parallax__title');
  if (!title || title.classList.contains('is-split')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const source = title.querySelector('span') ?? title;
  const text = (source.textContent ?? '').trim();
  if (!text) return;

  const words = text.split(/\s+/);
  const fragment = document.createDocumentFragment();

  words.forEach((word, index) => {
    const outer = document.createElement('span');
    outer.className = 'word';
    outer.setAttribute('aria-hidden', 'true');

    const inner = document.createElement('span');
    inner.className = 'word__inner';
    inner.style.setProperty('--i', String(index));
    inner.textContent = word;

    outer.appendChild(inner);
    fragment.appendChild(outer);
    if (index < words.length - 1) fragment.appendChild(document.createTextNode(' '));
  });

  title.setAttribute('aria-label', text);
  title.replaceChildren(fragment);
  title.classList.add('is-split');
}
