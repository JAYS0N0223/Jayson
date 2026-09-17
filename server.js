const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const DATA_FILE = path.join(DATA_DIR, 'guestbook.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
};

const readGuestbook = () => {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
};

const writeGuestbook = (entries) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries.slice(0, 30), null, 2), 'utf8');
};

const serveStatic = (req, res) => {
  const urlPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const targetPath = path.join(ROOT, urlPath);

  if (!targetPath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(targetPath, (error, file) => {
    if (error) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const extension = path.extname(targetPath).toLowerCase();
    const contentType = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    }[extension] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(file);
  });
};

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (req.url === '/api/guestbook') {
    if (req.method === 'GET') {
      sendJson(res, 200, readGuestbook());
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const name = String(payload.name || '').trim();
          const message = String(payload.message || '').trim();

          if (!name || !message) {
            sendJson(res, 400, { error: 'Name and message are required.' });
            return;
          }

          const entries = readGuestbook();
          entries.unshift({
            name,
            message,
            createdAt: Date.now()
          });

          const nextEntries = entries.slice(0, 30);
          writeGuestbook(nextEntries);
          sendJson(res, 200, nextEntries);
        } catch (error) {
          sendJson(res, 400, { error: 'Invalid JSON payload.' });
        }
      });
      return;
    }
  }

  serveStatic(req, res);
}).listen(PORT, () => {
  console.log(`Guestbook server listening on http://localhost:${PORT}`);
});
