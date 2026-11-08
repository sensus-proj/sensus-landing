/**
 * DevSecOps Platform Verification Script
 * Ensures that ALL check runs, security scans, and Quality Gates (including SonarCloud and CI)
 * have completed successfully on the target commit before allowing deployment to production.
 */

const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || 'sensus-proj/sensus-landing';
const GITHUB_SHA = process.env.GITHUB_SHA;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

if (!GITHUB_SHA) {
  console.error('❌ Error: Variable de entorno GITHUB_SHA no definida.');
  process.exitCode = 1;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson(url) {
  const headers = {
    'User-Agent': 'DevSecOps-Deploy-Gate',
    'Accept': 'application/vnd.github+json',
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

async function verifyAllChecks() {
  console.log(`🛡️ Iniciando verificación de suites DevSecOps y SonarCloud para commit ${GITHUB_SHA}...`);

  const maxAttempts = 36; // 36 * 5s = 180s (3 minutos max)
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt++;
    const url = `https://api.github.com/repos/${GITHUB_REPOSITORY}/commits/${GITHUB_SHA}/check-runs`;
    const data = await fetchJson(url);
    const checkRuns = data.check_runs || [];

    // Excluir compuerta actual y el paso de despliegue para evitar autorreferencias
    const currentJobName = process.env.GITHUB_JOB || 'sonar-and-devsecops-gate';
    const externalChecks = checkRuns.filter(
      (c) => !c.name.includes(currentJobName) && !c.name.includes('Despliegue')
    );

    const pending = externalChecks.filter((c) => c.status !== 'completed');
    const failed = externalChecks.filter(
      (c) => c.status === 'completed' && c.conclusion !== 'success' && c.conclusion !== 'neutral' && c.conclusion !== 'skipped'
    );
    const sonarCheck = externalChecks.find((c) => c.name.toLowerCase().includes('sonarcloud'));

    console.log(`[Intento ${attempt}/${maxAttempts}] Checks totales: ${externalChecks.length} | Pendientes: ${pending.length} | Fallidos: ${failed.length}`);

    // Si algún check externo ya falló, abortar de inmediato sin esperar
    if (failed.length > 0) {
      console.error('\n❌ COMPUERTA DE SEGURIDAD DEVSECOPS RECHAZADA:');
      for (const f of failed) {
        console.error(`   - ❌ [${f.name}]: status=${f.status}, conclusion=${f.conclusion}`);
        if (f.output && f.output.summary) {
          console.error(`     Resumen: ${f.output.summary.trim().split('\n')[0]}`);
        }
      }
      console.error('\n⛔ Se cancela el despliegue a producción de forma estricta según CONSTITUTION.md y AGENTS.md.');
      process.exitCode = 1;
      return;
    }

    // Si aún hay checks pendientes o si SonarCloud aún no ha reportado resultado, esperar
    if (pending.length > 0 || !sonarCheck || sonarCheck.status !== 'completed') {
      const waitReason = pending.length > 0
        ? `Esperando ${pending.length} checks en progreso (${pending.map((p) => p.name).join(', ')})`
        : 'Esperando reporte final de SonarCloud Code Analysis...';
      console.log(`⏳ ${waitReason}`);
      await sleep(5000);
      continue;
    }

    // Si llegamos aquí, todos los checks externos están 'completed' y ninguno falló
    console.log('\n✅ Todas las suites de análisis y DevSecOps concluyeron con éxito:');
    for (const c of externalChecks) {
      console.log(`   - ✔ [${c.name}]: ${c.conclusion}`);
    }

    if (sonarCheck && sonarCheck.conclusion === 'success') {
      console.log('✅ SonarCloud Quality Gate APROBADO con calificación A.');
    }

    console.log('🚀 Autorización concedida para avanzar a la fase de despliegue.\n');
    return;
  }

  console.error('\n❌ Timeout esperando que todas las suites de seguridad y SonarCloud completaran.');
  process.exitCode = 1;
}

verifyAllChecks().catch((err) => {
  console.error('❌ Error inesperado verificando compuertas DevSecOps:', err);
  process.exitCode = 1;
});
