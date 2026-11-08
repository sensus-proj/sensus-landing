import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html><body>
      <script>
        async function convert() {
          const img = new Image();
          img.src = '/hero-people.jpg';
          await new Promise((r, j) => { img.onload = r; img.onerror = j; });
          for (const w of [480, 768, 1200]) {
            const h = Math.round(w * (img.naturalHeight / img.naturalWidth));
            const canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            const blob = await new Promise(r => canvas.toBlob(r, 'image/webp', 0.85));
            await fetch('/save?name=hero-people-' + w + '.webp', {
              method: 'POST',
              body: blob
            });
          }
          // Also save default webp
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
          canvas.getContext('2d').drawImage(img, 0, 0);
          const blob = await new Promise(r => canvas.toBlob(r, 'image/webp', 0.85));
          await fetch('/save?name=hero-people.webp', { method: 'POST', body: blob });
          await fetch('/done');
        }
        convert();
      </script>
      </body></html>
    `);
    return;
  }

  if (req.url === '/hero-people.jpg') {
    const filePath = path.join(__dirname, '..', 'public', 'assets', 'hero-people.jpg');
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  if (req.url.startsWith('/save')) {
    const urlObj = new URL(req.url, 'http://localhost');
    const name = urlObj.searchParams.get('name');
    const outPath = path.join(__dirname, '..', 'public', 'assets', name);
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      fs.writeFileSync(outPath, Buffer.concat(chunks));
      console.log('Saved', name);
      res.writeHead(200); res.end('ok');
    });
    return;
  }

  if (req.url === '/done') {
    res.writeHead(200); res.end('done');
    console.log('Conversion finished successfully');
    process.exit(0);
  }
});

server.listen(9876, () => {
  console.log('Converter server listening on 9876');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    'http://localhost:9876'
  ]);
  chrome.on('error', e => console.error('Chrome error:', e));
  setTimeout(() => {
    console.log('Timeout hit, closing server');
    process.exit(1);
  }, 10000);
});
