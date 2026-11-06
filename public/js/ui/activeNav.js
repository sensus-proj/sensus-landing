export function markActiveNav() {
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav]').forEach((link) => {
    const target = (link.getAttribute('data-nav') || '').toLowerCase();
    if (target === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}
