import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const root = path.join(__dirname, '..');
const partialsDir = path.join(root, 'partials');
const headerPartial = fs.readFileSync(path.join(partialsDir, 'header.html'), 'utf8');
const footerPartial = fs.readFileSync(path.join(partialsDir, 'footer.html'), 'utf8');

function adjust(partial, prefix) {
  if (!prefix) return partial;
  return partial
    .replace(/href="assets\//g, `href="${prefix}assets/`)
    .replace(/href="css\//g, `href="${prefix}css/`)
    .replace(/href="index\.html"/g, `href="${prefix}index.html"`)
    .replace(/href="privacidad\.html"/g, `href="${prefix}privacidad.html"`)
    .replace(/href="eliminar-cuenta\.html"/g, `href="${prefix}eliminar-cuenta.html"`)
    .replace(/href="contacto\.html"/g, `href="${prefix}contacto.html"`);
}

function inject(html, name, partial) {
  const start = `<!-- partial:${name}:start -->`;
  const end = `<!-- partial:${name}:end -->`;
  const block = `${start}\n${partial}\n${end}`;
  const re = new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
  if (re.test(html)) return html.replace(re, block);
  return html;
}

const pages = [
  { file: 'public/index.html', prefix: '' },
  { file: 'public/privacidad.html', prefix: '' },
  { file: 'public/eliminar-cuenta.html', prefix: '' },
  { file: 'public/contacto.html', prefix: '' },
  { file: 'public/reset.html', prefix: '' },
  { file: 'public/reset/index.html', prefix: '../' },
];

for (const p of pages) {
  const full = path.join(root, p.file);
  if (!fs.existsSync(full)) continue;
  let html = fs.readFileSync(full, 'utf8');
  const prefix = p.prefix;
  html = inject(html, 'header', adjust(headerPartial, prefix));
  html = inject(html, 'footer', adjust(footerPartial, prefix));
  fs.writeFileSync(full, html);
  console.log('Built', p.file);
}
