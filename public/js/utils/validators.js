export function isValidEmail(value) {
  if (typeof value !== 'string') return false;
  return /^[^\s@]+@[^@\s.]+(\.[^@\s.]+)+$/.test(value.trim());
}

export function validateContactForm({ name, email, message }) {
  const errors = {};
  const n = (name || '').trim();
  const e = (email || '').trim();
  const m = (message || '').trim();

  if (n.length < 2 || n.length > 80) {
    errors.name = 'El nombre debe tener entre 2 y 80 caracteres.';
  }
  if (!isValidEmail(e)) {
    errors.email = 'Ingresa un correo válido.';
  }
  if (m.length < 10 || m.length > 1000) {
    errors.message = 'El mensaje debe tener entre 10 y 1000 caracteres.';
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}
