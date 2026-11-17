import { STORE_LINKS } from '../config.js';

const VALID_CODE_RE = /^[A-Z0-9-]{6,32}$/;

export function parseInviteParams(search = '') {
  const params = new URLSearchParams(search);
  const rawCode = (params.get('code') || '').trim().toUpperCase();
  if (!VALID_CODE_RE.test(rawCode)) return null;

  const rawName = (params.get('name') || '').trim().slice(0, 60);
  const isFallback = params.get('invite_fallback') === '1';
  return { code: rawCode, name: rawName, isFallback };
}

export function buildInviteDeepLinks(code, name = '') {
  const queryParts = [`code=${encodeURIComponent(code)}`];
  if (name) queryParts.push(`name=${encodeURIComponent(name)}`);
  const query = queryParts.join('&');
  const fallbackUrl = `https://rodnix.com.mx/sensus/?invite_fallback=1&${query}`;
  const intentUrl =
    `intent://invitacion?${query}#Intent;scheme=sensus;package=sensus.com;` +
    `S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;

  return {
    intentUrl,
    schemeUrl: `sensus://invitacion?${query}`,
    fallbackUrl
  };
}

export function initInviteHandler(
  locationObj = typeof window !== 'undefined' ? window.location : null,
  navigatorObj = typeof navigator !== 'undefined' ? navigator : null,
  doc = typeof document !== 'undefined' ? document : null
) {
  if (!locationObj || !doc) return;
  const parsed = parseInviteParams(locationObj.search || '');
  if (!parsed) return;

  const links = buildInviteDeepLinks(parsed.code, parsed.name);
  renderInviteBanner(doc, parsed, links);

  const ua = navigatorObj?.userAgent || '';
  if (/android/i.test(ua) && !parsed.isFallback) {
    locationObj.href = links.intentUrl;
  }
}

function renderInviteBanner(doc, parsed, links) {
  const host = doc.querySelector('.hero-parallax__cta-box') || doc.body;
  if (!host || doc.getElementById('sensusInviteBanner')) return;

  const banner = doc.createElement('div');
  banner.id = 'sensusInviteBanner';
  banner.className = 'invite-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Invitación de amigo en Sensus');

  const title = doc.createElement('p');
  title.className = 'invite-banner__title';
  title.textContent = parsed.name
    ? `${parsed.name} te invitó a conectar en Sensus`
    : 'Te enviaron una invitación de amigo en Sensus';

  const code = doc.createElement('span');
  code.className = 'invite-banner__code';
  code.textContent = `Código: ${parsed.code}`;

  const actions = doc.createElement('div');
  actions.className = 'invite-banner__actions';

  const openAppBtn = doc.createElement('a');
  openAppBtn.className = 'invite-banner__btn invite-banner__btn--primary';
  openAppBtn.href = links.intentUrl;
  openAppBtn.textContent = 'Abrir en la App Sensus';

  const downloadBtn = doc.createElement('a');
  downloadBtn.className = 'invite-banner__btn invite-banner__btn--secondary';
  downloadBtn.href = STORE_LINKS.googlePlay;
  downloadBtn.target = '_blank';
  downloadBtn.rel = 'noopener';
  downloadBtn.textContent = 'Descargar en Google Play';

  actions.appendChild(openAppBtn);
  actions.appendChild(downloadBtn);
  banner.appendChild(title);
  banner.appendChild(code);
  banner.appendChild(actions);

  host.prepend(banner);
}
