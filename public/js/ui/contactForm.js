import { validateContactForm } from '../utils/validators.js';
import { sendContactMessage } from '../services/contactService.js';
import { trackEvent } from '../services/analytics.js';

export function initContactForm(form) {
  if (!form) return;

  const nameInput = form.querySelector('#contactName');
  const emailInput = form.querySelector('#contactEmail');
  const messageInput = form.querySelector('#contactMessage');
  const submitButton = form.querySelector('button[type="submit"]');
  const status = document.getElementById('contactStatus');

  const errorEls = {
    name: document.getElementById('contactNameError'),
    email: document.getElementById('contactEmailError'),
    message: document.getElementById('contactMessageError')
  };

  function clearErrors() {
    Object.values(errorEls).forEach((el) => { if (el) el.textContent = ''; });
    [nameInput, emailInput, messageInput].forEach((input) => input && input.classList.remove('is-invalid'));
  }

  function showErrors(errors) {
    if (errors.name && errorEls.name) {
      errorEls.name.textContent = errors.name;
      nameInput.classList.add('is-invalid');
    }
    if (errors.email && errorEls.email) {
      errorEls.email.textContent = errors.email;
      emailInput.classList.add('is-invalid');
    }
    if (errors.message && errorEls.message) {
      errorEls.message.textContent = errors.message;
      messageInput.classList.add('is-invalid');
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearErrors();

    const honeypot = form.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value) {
      return;
    }

    const payload = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    };

    const { errors, isValid } = validateContactForm(payload);
    if (!isValid) {
      showErrors(errors);
      return;
    }

    const originalLabel = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    if (status) {
      status.textContent = '';
      status.classList.remove('is-success', 'is-error');
    }

    try {
      await sendContactMessage(payload);
      trackEvent('contacto_enviado', { formulario: 'contacto' });
      if (status) {
        status.textContent = '¡Gracias! Recibimos tu mensaje.';
        status.classList.add('is-success');
      }
      form.reset();
    } catch (error) {
      if (status) {
        if (error && error.message === 'contact_endpoint_not_configured') {
          status.textContent = 'Configura el endpoint de contacto en js/config.js (Formspree) para enviar mensajes.';
        } else {
          status.textContent = 'No pudimos enviar tu mensaje. Inténtalo de nuevo; no perdiste lo que escribiste.';
        }
        status.classList.add('is-error');
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  });
}
