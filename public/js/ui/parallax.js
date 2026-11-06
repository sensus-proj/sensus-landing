/**
 * Efecto Parallax interactivo de profundidad 3D
 * Capa de fondo (imagen) + capas frontales (título y botón)
 */
export function initHeroParallax() {
  const hero = document.querySelector('.hero-parallax');
  if (!hero) return;

  const bg = hero.querySelector('.hero-parallax__bg');
  const title = hero.querySelector('.hero-parallax__title');
  const cta = hero.querySelector('.hero-parallax__cta');

  if (!bg) return;

  // Respetar preferencias de accesibilidad
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  function update() {
    // Interpolación suave (lerp)
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    // Fondo: movimiento inverso para dar profundidad
    bg.style.transform = `scale(1.08) translate3d(${(-currentX * 24).toFixed(2)}px, ${(-currentY * 18).toFixed(2)}px, 0)`;

    // Título en esquina inferior izquierda: ligero avance
    if (title) {
      title.style.transform = `translate3d(${(currentX * 10).toFixed(2)}px, ${(currentY * 8).toFixed(2)}px, 0)`;
    }

    // Botón en esquina inferior derecha: avance con mayor relieve
    if (cta) {
      cta.style.transform = `translate3d(${(currentX * 14).toFixed(2)}px, ${(currentY * 10).toFixed(2)}px, 0)`;
    }

    rafId = requestAnimationFrame(update);
  }

  // Escuchar movimiento del cursor
  function onMouseMove(e) {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetX = Math.max(-0.5, Math.min(0.5, x));
    targetY = Math.max(-0.5, Math.min(0.5, y));
  }

  function onMouseLeave() {
    targetX = 0;
    targetY = 0;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mouseleave', onMouseLeave, { passive: true });

  // Soporte para inclinación de giroscopio en móviles
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: -90 a 90 (inclinación lateral), beta: -180 a 180 (frontal)
        targetX = Math.max(-0.5, Math.min(0.5, e.gamma / 45));
        targetY = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 45));
      }
    }, { passive: true });
  }

  rafId = requestAnimationFrame(update);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseleave', onMouseLeave);
  };
}
