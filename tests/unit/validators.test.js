import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, isValidEmail } from '../../public/js/utils/validators.js';

test('isValidEmail accepts valid emails', () => {
  assert.equal(isValidEmail('a@b.com'), true);
});

test('isValidEmail rejects invalid emails', () => {
  assert.equal(isValidEmail('invalid'), false);
});

test('validateContactForm returns errors for empty input', () => {
  const { isValid, errors } = validateContactForm({ name: '', email: '', message: '' });
  assert.equal(isValid, false);
  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.message);
});

test('validateContactForm accepts valid input', () => {
  const { isValid } = validateContactForm({
    name: 'Ana',
    email: 'ana@example.com',
    message: 'Hola, esto es un mensaje de prueba con suficiente longitud.'
  });
  assert.equal(isValid, true);
});
