import { CONTACT_ENDPOINT, CONTACT_SUBJECT } from '../config.js';

export async function sendContactMessage(payload) {
  if (!CONTACT_ENDPOINT || CONTACT_ENDPOINT.includes('your-form-id')) {
    throw new Error('contact_endpoint_not_configured');
  }
  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: payload.name.trim(),
      email: payload.email.trim(),
      message: payload.message.trim(),
      _subject: CONTACT_SUBJECT,
      _replyto: payload.email.trim()
    })
  });

  if (!response.ok) {
    throw new Error('request_failed');
  }

  return response.json().catch(() => ({}));
}
