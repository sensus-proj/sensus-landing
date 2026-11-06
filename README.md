# Sensus Landing

Landing page estática de Sensus y páginas legales (Privacidad, Eliminar cuenta, Contacto).

## Estructura

- `public/` — sitio publicado (HTML, CSS, JS, assets).
- `public/css/tokens.css` — variables de diseño.
- `public/css/base.css` — reset y tipografía.
- `public/css/layout.css` — contenedor, grid y secciones.
- `public/css/components.css` — componentes reutilizables.
- `public/css/pages/` — estilos específicos por página.
- `public/js/config.js` — configuración central (enlaces de tienda, endpoint de contacto).
- `public/js/utils/`, `services/`, `ui/` — módulos ES de una sola responsabilidad.
- `partials/` — header y footer únicos, inyectados en build.
- `scripts/build.js` — inyecta partials en las páginas.
- `scripts/check-assets.js` — verifica assets requeridos y prohibidos.
- `tests/unit/` — pruebas unitarias.
- `tests/screenshots/` — capturas generadas por pruebas (ignorado en git).

## Tokens

Colores, espaciados, radios, sombras y tipografía viven en `tokens.css`. No uses valores mágicos ni hex sueltos en otros archivos.

## Componentes reutilizables

- `.btn-store` con variantes `--dark` y `--green`.
- `.chip`, `.feature-pill` con variantes de color.
- `.card`, `.info-card-clean`, `.step-card-clean`, `.contact-card-*`.
- Header y footer definidos una sola vez en `partials/`.

## Variables de entorno

Para el formulario de contacto se usa un servicio de formularios (Formspree). Configura el endpoint en `public/js/config.js` (`CONTACT_ENDPOINT`) y el destinatario en el panel del proveedor (`CONTACT_TO_EMAIL=rodri.dev334@gmail.com`). Credenciales SMTP solo aplican si se usa backend propio.

## Política de assets

- Un único original por imagen en `assets-src/` (fuera de lo público).
- Solo variantes derivadas en `public/assets/`.
- Sin capturas de prueba en `public/assets/screenshots/`.
- Sin archivos sin referencia (verificado por `npm run lint`).
