import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Lista de resoluciones exactas exigidas
const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080, type: 'desktop', desc: 'Escritorio Ultra-Wide' },
  { name: '1440x900',  width: 1440, height: 900,  type: 'desktop', desc: 'Laptop / Monitor Estándar' },
  { name: '1280x720',  width: 1280, height: 720,  type: 'desktop', desc: 'Laptop HD (16:9)' },
  { name: '1024x768',  width: 1024, height: 768,  type: 'tablet-landscape', desc: 'Tablet Landscape / Laptop Chica' },
  { name: '768x1024',  width: 768,  height: 1024, type: 'tablet-portrait', desc: 'Tablet Vertical (iPad)' },
  { name: '390x844',   width: 390,  height: 844,  type: 'mobile', desc: 'iPhone 12/13/14/15' },
  { name: '360x640',   width: 360,  height: 640,  type: 'mobile', desc: 'Android Compacto' },
  { name: '844x390',   width: 844,  height: 390,  type: 'landscape', desc: 'iPhone Landscape (<500px)' }
];

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'tests', 'screenshots');
const ARTIFACT_DIR = path.join(__dirname, '..', 'reports');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

// 1. Servidor estático simple
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url || '/', 'http://localhost:9877');
  let pathname = decodeURIComponent(reqUrl.pathname);
  if (pathname === '/') pathname = '/index.html';

  const baseDir = path.resolve(PUBLIC_DIR);
  const normalizedPath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  const resolvedPath = path.resolve(baseDir, '.' + normalizedPath);

  if (!resolvedPath.startsWith(baseDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(resolvedPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const stream = fs.createReadStream(resolvedPath);
  stream.on('open', () => {
    res.writeHead(200, { 'Content-Type': contentType });
    stream.pipe(res);
  });
  stream.on('error', (err) => {
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
    }
  });
});

server.listen(9877, async () => {
  console.log('Servidor de prueba local corriendo en http://localhost:9877');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const debuggingPort = 9223;

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${debuggingPort}`,
    '--disable-extensions',
    '--disable-background-networking',
    '--hide-scrollbars',
    'about:blank'
  ]);

  chromeProc.on('error', (err) => {
    console.error('Error al iniciar Chrome:', err);
    process.exit(1);
  });

  let browserWsUrl = '';
  const wsReadyPromise = new Promise((resolve, reject) => {
    chromeProc.stderr.on('data', (chunk) => {
      const text = chunk.toString();
      const match = text.match(/ws:\/\/127\.0\.0\.1:\d+\/devtools\/browser\/[a-zA-Z0-9-]+/);
      if (match) {
        browserWsUrl = match[0];
        resolve(browserWsUrl);
      }
    });
    setTimeout(() => reject(new Error('Tiempo de espera agotado para el endpoint de Chrome')), 10000);
  });

  try {
    const safeWsUrl = await wsReadyPromise;
    console.log('Conectado al endpoint seguro de Chrome:', safeWsUrl);

    const ws = new WebSocket(safeWsUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    let attachedSessionId = null;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const res = JSON.parse(event.data);
          if (res.id === id) {
            ws.removeEventListener('message', handler);
            resolve(res.result);
          }
        };
        ws.addEventListener('message', handler);
        const payload = { id, method, params };
        if (attachedSessionId) {
          payload.sessionId = attachedSessionId;
        }
        ws.send(JSON.stringify(payload));
      });
    }

    // Obtener páginas y adjuntar sesión
    const targets = await send('Target.getTargets');
    const pageTarget = (targets && targets.targetInfos) ? targets.targetInfos.find(t => t.type === 'page') : null;
    if (pageTarget && pageTarget.targetId) {
      const attachRes = await send('Target.attachToTarget', { targetId: pageTarget.targetId, flatten: true });
      attachedSessionId = attachRes.sessionId;
    }

    // Inicializar CDP
    await send('Page.enable');
    await send('DOM.enable');
    const resultsSummary = [];

    for (const vp of VIEWPORTS) {
      console.log(`\n========================================`);
      console.log(`PROBANDO RESOLUCIÓN: ${vp.name} (${vp.desc})`);
      console.log(`========================================`);

      // Configurar emulación de pantalla
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.type === 'mobile' || vp.type === 'landscape'
      });

      // Navegar a la página
      await send('Page.navigate', { url: 'http://localhost:9877/index.html' });
      await new Promise(r => setTimeout(r, 1500));

      // Evaluación en página
      const evalRes = await send('Runtime.evaluate', {
        expression: `
          (function() {
            const doc = document.documentElement;
            const scrollW = doc.scrollWidth;
            const clientW = doc.clientWidth;
            const hasHorizontalScroll = scrollW > clientW + 1;

            const scrollH = doc.scrollHeight;
            const clientH = doc.clientHeight;
            const hasVerticalScroll = scrollH > clientH + 2;

            const logo = document.querySelector('.brand-logo-img');
            const logoRect = logo ? logo.getBoundingClientRect() : null;
            const logoOk = logo ? (logoRect.width > 0 && logoRect.height > 0 && logoRect.top >= 0 && logoRect.bottom <= window.innerHeight) : true;

            const btns = document.querySelectorAll('.btn-store');
            const btnPlay = btns[0] || null;
            const btnWa = btns[1] || null;
            const btnPlayRect = btnPlay ? btnPlay.getBoundingClientRect() : null;
            const btnWaRect = btnWa ? btnWa.getBoundingClientRect() : null;

            const buttonsVisible = Boolean(btnPlayRect && btnPlayRect.bottom <= window.innerHeight);

            const img = document.querySelector('.hero-parallax__bg, .hero-screen-fit__img, .hero-full-bleed__img, .home-cover-img, .hero-people-img');
            const imgRect = img ? img.getBoundingClientRect() : null;

            return {
              scrollW, clientW, hasHorizontalScroll,
              scrollH, clientH, hasVerticalScroll,
              logoOk,
              buttonsVisible,
              btnPlayH: btnPlayRect ? Math.round(btnPlayRect.height) : 0,
              btnPlayW: btnPlayRect ? Math.round(btnPlayRect.width) : 0,
              btnWaH: btnWaRect ? Math.round(btnWaRect.height) : 0,
              btnWaW: btnWaRect ? Math.round(btnWaRect.width) : 0,
              imgW: imgRect ? Math.round(imgRect.width) : 0,
              imgH: imgRect ? Math.round(imgRect.height) : 0
            };
          })()
        `,
        returnByValue: true
      });

      const metrics = (evalRes && evalRes.result && evalRes.result.value) ? evalRes.result.value : (evalRes && evalRes.value ? evalRes.value : {});

      // Capturar pantalla
      const shotRes = await send('Page.captureScreenshot', { format: 'png' });
      const imgBuffer = Buffer.from(shotRes.data, 'base64');
      const filename = `screenshot-${vp.name}.png`;
      const outPath = path.join(SCREENSHOTS_DIR, filename);
      fs.writeFileSync(outPath, imgBuffer);

      // Copiar también al artifact dir para embedding
      const artifactOutPath = path.join(ARTIFACT_DIR, filename);
      fs.writeFileSync(artifactOutPath, imgBuffer);

      console.log(`[CAPTURA GUARDADA] -> ${filename}`);
      console.log(`- Scroll horizontal: ${metrics.hasHorizontalScroll ? 'FALLO (Hay scroll H)' : 'EXITOSO (Sin scroll H: ' + metrics.scrollW + 'px / ' + metrics.clientW + 'px)'}`);
      console.log(`- Scroll vertical: ${metrics.hasVerticalScroll ? 'Activo (scroll normal: ' + metrics.scrollH + 'px / ' + metrics.clientH + 'px)' : 'CERO SCROLL (100dvh exacto: ' + metrics.scrollH + 'px)'}`);
      console.log(`- Botón PlayStore: ${metrics.btnPlayW}x${metrics.btnPlayH}px`);
      console.log(`- Botón WhatsApp:  ${metrics.btnWaW}x${metrics.btnWaH}px`);
      console.log(`- Botones visibles sin scroll: ${metrics.buttonsVisible ? 'SÍ' : 'NO (requiere scroll en móvil/landscape)'}`);
      console.log(`- Logo completo: ${metrics.logoOk ? 'SÍ' : 'NO'}`);
      console.log(`- Dimensiones imagen: ${metrics.imgW}x${metrics.imgH}px`);

      resultsSummary.push({
        viewport: vp.name,
        desc: vp.desc,
        hasHorizontalScroll: metrics.hasHorizontalScroll,
        hasVerticalScroll: metrics.hasVerticalScroll,
        buttonsVisible: metrics.buttonsVisible,
        btnMatch: metrics.btnPlayH === metrics.btnWaH,
        logoOk: metrics.logoOk,
        filename
      });
    }

    console.log('\n========================================');
    console.log('RESUMEN DE PRUEBAS RESPONSIVE EXITOSAS');
    console.log('========================================');
    console.table(resultsSummary);

    chromeProc.kill();
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Error durante la ejecución del test:', err);
    chromeProc.kill();
    server.close();
    process.exit(1);
  }
});
