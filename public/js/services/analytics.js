// Eventos de analítica para Google Tag Manager / GA4.
// Solo se envían eventos y parámetros de una lista blanca, con valores cortos
// y normalizados: nunca datos personales ni contenido escrito por la persona.

export const ALLOWED_EVENTS = Object.freeze([
  'descarga_app',
  'clic_red_social',
  'clic_whatsapp',
  'contacto_enviado'
]);

export const ALLOWED_PARAMS = Object.freeze([
  'ubicacion',
  'red_social',
  'formulario'
]);

const VALUE_PATTERN = /^[a-z0-9_]{1,40}$/;

function toSnakeCase(key) {
  return key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function buildEvent(name, params = {}) {
  if (!ALLOWED_EVENTS.includes(name)) return null;

  const event = { event: name };
  for (const [key, value] of Object.entries(params || {})) {
    if (!ALLOWED_PARAMS.includes(key)) continue;
    if (typeof value !== 'string' || !VALUE_PATTERN.test(value)) continue;
    event[key] = value;
  }
  return event;
}

export function trackEvent(name, params = {}, target = globalThis) {
  const event = buildEvent(name, params);
  if (!event || !target) return false;

  target.dataLayer = Array.isArray(target.dataLayer) ? target.dataLayer : [];
  target.dataLayer.push(event);
  return true;
}

// Lee data-track="evento" y data-track-<parametro>="valor" de un elemento.
export function readTrackAttributes(element) {
  const dataset = element && element.dataset;
  if (!dataset || !dataset.track) return null;

  const params = {};
  for (const [key, value] of Object.entries(dataset)) {
    if (key === 'track' || !key.startsWith('track')) continue;
    const rest = key.slice('track'.length);
    params[toSnakeCase(rest.charAt(0).toLowerCase() + rest.slice(1))] = value;
  }
  return { name: dataset.track, params };
}

export function initClickTracking(root = globalThis.document, target = globalThis) {
  if (!root || typeof root.addEventListener !== 'function') return;

  root.addEventListener('click', (event) => {
    const origin = event.target;
    const element = origin && typeof origin.closest === 'function' ? origin.closest('[data-track]') : null;
    const data = readTrackAttributes(element);
    if (data) trackEvent(data.name, data.params, target);
  }, { capture: true });
}
