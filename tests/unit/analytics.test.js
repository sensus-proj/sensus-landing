import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEvent, trackEvent, readTrackAttributes, initClickTracking } from '../../public/js/services/analytics.js';

test('buildEvent keeps only allowed events', () => {
  assert.equal(buildEvent('evento_inventado'), null);
  assert.deepEqual(buildEvent('descarga_app', { ubicacion: 'hero_qr' }), { event: 'descarga_app', ubicacion: 'hero_qr' });
});

test('buildEvent drops unknown params and unsafe values', () => {
  const event = buildEvent('clic_red_social', {
    red_social: 'instagram',
    email: 'ana@example.com',
    ubicacion: '<script>alert(1)</script>',
    formulario: 42
  });
  assert.deepEqual(event, { event: 'clic_red_social', red_social: 'instagram' });
});

test('trackEvent pushes to dataLayer and creates it when missing', () => {
  const target = {};
  assert.equal(trackEvent('contacto_enviado', { formulario: 'contacto' }, target), true);
  assert.deepEqual(target.dataLayer, [{ event: 'contacto_enviado', formulario: 'contacto' }]);
});

test('trackEvent ignores events outside the allowlist', () => {
  const target = { dataLayer: [] };
  assert.equal(trackEvent('otro', {}, target), false);
  assert.equal(target.dataLayer.length, 0);
});

test('readTrackAttributes maps data-track-* to snake_case params', () => {
  const element = { dataset: { track: 'clic_red_social', trackRedSocial: 'tiktok', other: 'x' } };
  assert.deepEqual(readTrackAttributes(element), { name: 'clic_red_social', params: { red_social: 'tiktok' } });
  assert.equal(readTrackAttributes({ dataset: {} }), null);
  assert.equal(readTrackAttributes(null), null);
});

test('initClickTracking sends the event of the closest tracked element', () => {
  let handler;
  const root = { addEventListener: (type, fn) => { if (type === 'click') handler = fn; } };
  const target = { dataLayer: [] };
  const link = { dataset: { track: 'descarga_app', trackUbicacion: 'hero_boton' } };
  initClickTracking(root, target);

  handler({ target: { closest: () => link } });
  handler({ target: { closest: () => null } });

  assert.deepEqual(target.dataLayer, [{ event: 'descarga_app', ubicacion: 'hero_boton' }]);
});
