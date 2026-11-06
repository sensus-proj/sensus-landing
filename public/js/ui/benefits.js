import { BENEFITS } from '../config.js';

export function renderBenefits(container) {
  if (!container) return;
  container.innerHTML = '';
  for (const item of BENEFITS) {
    const span = document.createElement('span');
    span.className = `feature-pill feature-pill--${item.variant}`;
    span.textContent = item.label;
    container.appendChild(span);
  }
}
