# Directrices para Agentes de IA — Proyecto Sensus

Este documento establece las instrucciones operativas, límites de actuación y directrices obligatorias para todos los Agentes de Inteligencia Artificial (y herramientas de programación asistida) que colaboren en el repositorio `sensus-landing`.

---

## 🛡️ Regla Fundamental DevSecOps (Inviolable y de Máxima Prioridad)

> **REGLA DE ORO:**  
> **Ningún proceso de validación de seguridad de la aplicación, ni de escaneo de código se debe saltar, skipear, brincar, silenciar, excluir o burlar bajo ningún concepto.** Esto atenta de forma directa contra la metodología DevSecOps del proyecto.

### Restricciones Específicas para los Agentes:
1. **Cero Exclusiones Artificiales:**  
   Está terminantemente prohibido añadir exclusiones en analizadores o escáneres (por ejemplo `sonar.exclusions` en `.sonarcloud.properties` o `sonar-project.properties`) con el fin de "aprobar" el Quality Gate ocultando archivos o scripts vulnerables del escaneo.
2. **Corrección en Origen (Fix-at-Source):**  
   Cualquier vulnerabilidad detectada (como *Connection Hijacking*, *Path Traversal*, *Log Injection*, *ReDoS*, permisos indebidos o fallas de accesibilidad) **debe resolverse y refactorizarse directamente en el código fuente**.
3. **No Silenciar ni Burlar Linters o CI:**  
   No se permite el uso de directivas de supresión de análisis, flags de evasión (`--no-verify`, ignorar compuertas, etc.) ni simular resultados exitosos mediante mocks no autorizados.
4. **Verificación Local Obligatoria:**  
   Antes de confirmar cualquier cambio, el Agente debe ejecutar y verificar localmente todas las pruebas unitarias, linting, compilaciones y validaciones de DevSecOps.

---

## 📋 Estructura y Flujo de Trabajo

- **Landing Page Estática:** Archivos en `public/`, estilos en `public/css/` (con tokens de diseño centralizados en `tokens.css`), scripts modulares en `public/js/` y parciales en `partials/`.
- **Scripts de Compilación y Soporte:** En `scripts/` (`build.js`, `check-assets.js`, `test-responsive-captures.js`).
- **Pruebas Unitarias:** En `tests/unit/` ejecutadas con `npm run test:unit`.
- **Prototipo Web Vite:** En `app-vite-sensus/` (React 19 + TypeScript + Vite).
- **Gobernanza:** Toda acción debe alinearse con [CONSTITUTION.md](CONSTITUTION.md) y [docs/DEVSECOPS_LANDING.md](docs/DEVSECOPS_LANDING.md).
