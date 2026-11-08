# Constitución del Proyecto Sensus
## Gobernanza de Ingeniería, Seguridad y Metodología DevSecOps

> **ESTATUS:** Documento Fundacional y de Obligatorio Cumplimiento  
> **APLICABILIDAD:** Todos los contribuidores humanos, desarrolladores y Agentes de IA en el ecosistema Sensus.

---

### Artículo I — Principio Inviolable de No-Bypass en DevSecOps (Non-Bypass Policy)

1. **Prohibición Absoluta de Evasión:**  
   Bajo ninguna circunstancia se permite **saltar, skipear, brincar, silenciar, excluir o burlar** ningún proceso de validación de seguridad, escaneo estático de código (SAST), auditoría de dependencias (SCA), análisis de secretos, comprobaciones criptográficas de integridad (`assetlinks.json`), linters de seguridad o compuertas de calidad (*Quality Gates* en CI/CD y SonarCloud).

2. **Resolución en Origen (Fix-at-Source):**  
   Cualquier vulnerabilidad, advertencia o fallo detectado por herramientas automatizadas o auditorías debe resolverse de manera íntegra y profesional **directamente en el código fuente**. Queda estrictamente vetado el uso de exclusiones artificiales en analizadores (como `sonar.exclusions` sobre código de la app o scripts), desactivación de reglas de seguridad, o parches cosméticos que enmascaren el riesgo.

3. **Filosofía Fail-Closed:**  
   Si una compuerta de seguridad, suite de pruebas unitarias o análisis estático falla, el flujo de entrega continua (CI/CD) debe detenerse de inmediato (*Fail-Closed*). No se permite forzar despliegues, omitir verificaciones (`--no-verify`, omitir scripts o silenciar salidas) ni fusionar código a ramas principales que no cumpla formalmente con el 100% de los estándares de seguridad.

---

### Artículo II — Ecosistema de Seguridad y Herramientas Auditadas

1. **Detección de Secretos y Fugas:**  
   Uso permanente de Gitleaks y TruffleHog. Jamás se versionan credenciales, API keys o tokens de acceso en el repositorio.
2. **Análisis de Dependencias (SCA):**  
   Uso de `npm audit` y OSV-Scanner. Las dependencias deben estar estrictamente fijadas con `package-lock.json` y ejecutarse con `--ignore-scripts` en entornos de CI para prevenir inyección en el ciclo de vida.
3. **Análisis Estático (SAST):**  
   Análisis continuo con SonarCloud, CodeQL y Semgrep. Todo nuevo código debe alcanzar calificación **A** en Seguridad (*Security Rating*) y Confiabilidad (*Reliability Rating*), sin vulnerabilidades abiertas de Path Traversal, Log Injection, SSRF/Connection Hijacking, ReDoS o malas prácticas de accesibilidad.
4. **Integridad de Plataforma y Enlaces Nativos:**  
   Supervisión rigurosa de `.well-known/assetlinks.json`. Únicamente se admiten permisos explícitos autorizados (`handle_all_urls`, `get_login_creds`), huellas SHA-256 en mayúsculas de 32 pares y paquete oficial (`sensus.com`).
5. **Disponibilidad Legal Crítica:**  
   Garantía ininterrumpida de disponibilidad para las URLs legales de Aviso de Privacidad (`privacidad.html`) y Eliminación de Cuenta (`eliminar-cuenta.html`) exigidas por las políticas de Google Play Store.

---

### Artículo III — Mandato para Agentes de Inteligencia Artificial

1. **Subordinación Ética y Técnica:**  
   Cualquier Agente de IA que interactúe con el repositorio Sensus debe operar con estricta adherencia a esta Constitución.
2. **Rechazo de Atajos:**  
   El Agente debe rechazar de manera automática cualquier sugerencia o atajo que implique ignorar o eludir pruebas de seguridad para lograr una aprobación aparente. La solución debe ser siempre técnicamente robusta, reproducible en local y conforme a las mejores prácticas de la industria.
