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

feature/rediseno-landing-page
- Un único original por imagen en `assets-src/` (fuera de lo público).
- Solo variantes derivadas en `public/assets/`.
- Sin capturas de prueba en `public/assets/screenshots/`.
- Sin archivos sin referencia (verificado por `npm run lint`).
=======
Para que el workflow de despliegue funcione, configura estos secretos en **Settings > Secrets and variables > Actions**:

| Secret | Descripción | Ejemplo / Valor |
|---|---|---|
| `FTP_SERVER` | Servidor FTP de Neubox | `ftp.rodnix.com.mx` o IP del servidor |
| `FTP_USERNAME` | Usuario FTP de cPanel | Usuario de cPanel o cuenta FTP específica |
| `FTP_PASSWORD` | Contraseña del usuario FTP | Contraseña de la cuenta FTP |
| `FTP_PORT` | Puerto de conexión FTP | `21` |
| `FTP_PROTOCOL` | Protocolo de conexión seguro | `ftps` (o `ftp`) |

*(Nota: `GITHUB_TOKEN` es inyectado automáticamente por GitHub para Gitleaks).*

---

## 🚀 DevSecOps Quality Gate & Digital Asset Links

### Permisos Criptográficos Autorizados (`assetlinks.json`)
Sensus sigue el estándar de la industria implementando los dos permisos oficiales de Digital Asset Links:
1. **`delegate_permission/common.handle_all_urls` (Deep Linking Universal)**:
   - Permite que enlaces como el restablecimiento de contraseña (`/sensus/reset`) se abran directamente en la app nativa en vez del navegador.
2. **`delegate_permission/common.get_login_creds` (Compartir Contraseñas / SSO)**:
   - Habilita la integración con Google Password Manager / Smart Lock para autocompletar credenciales guardadas en web/Chrome directamente en la app de Android sin fricción ni reescritura de contraseñas.

### Compuertas Bloqueantes en CI/CD:
Cada push a `main` pasa por las siguientes compuertas antes de permitir la subida por FTP:
1. **Secret Scanning (Gitleaks)**: Detección y bloqueo ante fuga de credenciales o API keys.
2. **Integridad de App Links & Permisos**: Script en Python que valida sintaxis JSON, package name `sensus.com`, presencia de permisos `handle_all_urls` y `get_login_creds`, y formato estricto de huellas SHA-256 (32 pares hex).
3. **Verificación de Páginas Legales**: Comprobación obligatoria de existencia de `privacidad.html` y `eliminar-cuenta.html` para evitar suspensión en Google Play.
4. **SCA (Dependencias)**: `npm audit --audit-level=high` sobre el prototipo interactivo (0 vulnerabilidades).
