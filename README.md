# Sensus — Landing Page, Deep Links & DevSecOps

Repositorio oficial de la Landing Page de **Sensus**, integración de **Android App Links**, páginas legales obligatorias de Google Play y prototipo web interactivo con pipeline DevSecOps automatizado.

---

## 📁 Arquitectura del Repositorio

```text
sensus-landing/
├── .github/workflows/
│   ├── deploy.yml            # Pipeline CI/CD a cPanel Neubox con Security Gate bloqueante
│   └── security.yml          # Auditoría DevSecOps continua (PRs y escaneos programados)
│
├── public/                   # Archivos estáticos de producción desplegados en el hosting
│   ├── index.html            # Landing page principal (Bento Grid, UX/UI Sensus, Sensi IA showcase)
│   ├── eliminar-cuenta.html  # Página legal obligatoria de solicitud de eliminación de cuenta (Google Play)
│   ├── privacidad.html       # Política y aviso de privacidad legal (Google Play)
│   ├── reset.html            # Landing fallback para restablecimiento de contraseña (HU5)
│   ├── reset/
│   │   └── index.html        # Redirección inteligente (Android Intent & Scheme sensus://)
│   └── .well-known/
│       └── assetlinks.json   # Certificación SHA-256 para Android App Links (sensus.com)
│
├── app-vite-sensus/          # Prototipo SPA interactivo en React 19 + Vite 8 + TypeScript (Figma to Code)
│   ├── src/                  # App.tsx con showcase completo de pantallas y navegación
│   ├── public/figma_screens/ # Mockups y assets en alta definición
│   └── package.json
│
├── docs/
│   ├── DEVSECOPS_LANDING.md  # Estrategia DevSecOps completa (Móvil vs. Web, matriz y compuertas)
│   └── routes-laravel-reference.php # Referencia de integración de rutas en Laravel
│
├── .gitignore
└── README.md
```

---

## 🛡️ Aislamiento y Convivencia con `rodnix.com.mx`

Para **evitar cualquier colisión** con el sitio principal (`https://rodnix.com.mx`):

1. **Destino específico en FTP**:
   - La landing se despliega estrictamente en: `server-dir: /public_html/sensus/`
   - Los Android App Links se suben a: `server-dir: /public_html/.well-known/`
2. **Protección del sitio raíz**:
   - El pipeline utiliza `dangerous-clean-slate: false`, lo que garantiza que **NUNCA** eliminará ni modificará los archivos de la raíz de `rodnix.com.mx` (como `index.php`, `.htaccess`, assets de Vite de Rodnix ni la carpeta `/rodnix_app/`).
3. **URLs resultantes en producción**:
   - Landing Sensus: `https://rodnix.com.mx/sensus/`
   - Recuperación de contraseña: `https://rodnix.com.mx/sensus/reset`
   - Aviso de Privacidad: `https://rodnix.com.mx/sensus/privacidad.html`
   - Eliminación de Cuenta: `https://rodnix.com.mx/sensus/eliminar-cuenta.html`
   - Android App Links: `https://rodnix.com.mx/.well-known/assetlinks.json`

---

## 🔑 GitHub Actions Secrets Requeridos

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

## 🚀 DevSecOps Quality Gate

Cada push a `main` pasa por las siguientes compuertas antes de permitir la subida por FTP:
1. **Secret Scanning (Gitleaks)**: Detección y bloqueo ante fuga de credenciales o API keys.
2. **Integridad de App Links**: Script en Python que valida sintaxis JSON, package name `sensus.com` y fingerprint SHA-256.
3. **Verificación de Páginas Legales**: Comprobación obligatoria de existencia de `privacidad.html` y `eliminar-cuenta.html` para evitar suspensión en Google Play.
4. **SCA (Dependencias)**: `npm audit --audit-level=high` sobre el prototipo interactivo.
