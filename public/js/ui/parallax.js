/**
 * Efecto parallax ligero: fondo y bloques frontales se desplazan con el cursor.
 * El bucle de animación solo corre mientras hay movimiento y se detiene al
 * estabilizarse, para no consumir CPU/GPU en reposo.
 */
export function initHeroParallax() {
  const hero = document.querySelector('.hero-parallax');
  if (!hero) return;

  const bg = hero.querySelector('.hero-parallax__bg');
  const title = hero.querySelector('.hero-parallax__title');
  const cta = hero.querySelector('.hero-parallax__cta');

  if (!bg) return;

  // Solo con ratón/trackpad y sin preferencia de movimiento reducido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;
  let heroVisible = true;

  function update() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    bg.style.transform = `scale(1.08) translate3d(${(-currentX * 22).toFixed(2)}px, ${(-currentY * 16).toFixed(2)}px, 0)`;
    if (title) title.style.transform = `translate3d(${(currentX * 8).toFixed(2)}px, ${(currentY * 6).toFixed(2)}px, 0)`;
    if (cta) cta.style.transform = `translate3d(${(currentX * 12).toFixed(2)}px, ${(currentY * 8).toFixed(2)}px, 0)`;

    const settled = Math.abs(targetX - currentX) < 0.001 && Math.abs(targetY - currentY) < 0.001;
    rafId = settled ? null : requestAnimationFrame(update);
  }

  function start() {
    if (rafId === null && heroVisible) rafId = requestAnimationFrame(update);
  }

  function onMouseMove(e) {
    if (!heroVisible) return;
    const rect = hero.getBoundingClientRect();
    targetX = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
    targetY = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
    start();
  }

  function onMouseLeave() {
    targetX = 0;
    targetY = 0;
    start();
  }

  // No animar cuando el hero no se ve (al hacer scroll hacia abajo)
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      if (!heroVisible && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }).observe(hero);
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onMouseLeave, { passive: true });

  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    window.removeEventListener('mousemove', onMouseMove);
    document.documentElement.removeEventListener('mouseleave', onMouseLeave);
  };
}
