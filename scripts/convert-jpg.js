import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html><html><body><script>
      async function run(){
        const img=new Image();
        img.src='/hero-people-1200.webp';
        await new Promise((r,j)=>{img.onload=r;img.onerror=j;});
        const c=document.createElement('canvas');
        c.width=img.naturalWidth; c.height=img.naturalHeight;
        c.getContext('2d').drawImage(img,0,0);
        const blob=await new Promise(r=>c.toBlob(r,'image/jpeg',0.85));
        await fetch('/save?name=hero-people-1200.jpg',{method:'POST',body:blob});
        await fetch('/done');
      }
      run();
    </script></body></html>`);
    return;
  }
  if (req.url === '/hero-people-1200.webp') {
    fs.createReadStream(path.join(__dirname,'..','public','assets','hero-people-1200.webp')).pipe(res);
    res.writeHead(200,{'Content-Type':'image/webp'});
    return;
  }
  if (req.url.startsWith('/save')) {
    const urlObj=new URL(req.url,'http://localhost');
    const name=urlObj.searchParams.get('name');
    const out=path.join(__dirname,'..','public','assets',name);
    const chunks=[]; req.on('data',c=>chunks.push(c)); req.on('end',()=>{fs.writeFileSync(out,Buffer.concat(chunks));console.log('Saved',name);res.writeHead(200);res.end('ok');});
    return;
  }
  if (req.url==='/done'){res.writeHead(200);res.end('done');console.log('done');process.exit(0);}
});
server.listen(9880,()=>{
  console.log('listening');
  spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless=new','--no-sandbox','--disable-gpu','http://localhost:9880']);
});
setTimeout(()=>{console.log('timeout');process.exit(1);},10000);
