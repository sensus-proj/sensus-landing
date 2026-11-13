import fs from 'node:fs';
import path from 'node:path';

import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicAssets = path.join(__dirname, '..', 'public', 'assets');
const required = [
  'hero-people-480.webp',
  'hero-people-768.webp',
  'hero-people-1200.webp',
  'hero-people-1200.jpg',
  'logo.png',
  'image.png',
  'hero.webp',
  'hero-960.webp'
];
for (const file of required) {
  const full = path.join(publicAssets, file);
  if (!fs.existsSync(full)) {
    console.error('Missing required asset:', file);
    process.exit(1);
  }
}

const forbidden = ['screenshots', 'splash.mp4', 'store-illustration.png', 'hero-people.jpg', 'hero-people.webp', 'img.jpg'];
for (const name of forbidden) {
  const full = path.join(publicAssets, name);
  if (fs.existsSync(full)) {
    console.error('Forbidden or unused asset still present:', name);
    process.exit(1);
  }
}

console.log('Asset check passed.');
