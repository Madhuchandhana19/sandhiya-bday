const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/index.html';

  const filePath = path.join(PUBLIC_DIR, decodeURIComponent(reqUrl));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Access denied');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      let end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;

      // Optimize chunk streaming for fast video playback and zero buffering:
      // When browser requests open range (bytes=0-), serve in 2MB chunks so playback starts instantly
      const CHUNK_SIZE = 1024 * 1024 * 2; // 2MB chunk
      if (end - start + 1 > CHUNK_SIZE) {
        end = Math.min(start + CHUNK_SIZE - 1, stats.size - 1);
      }
      const chunksize = end - start + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });

      const stream = fs.createReadStream(filePath, { start, end });
      req.on('close', () => {
        stream.destroy();
      });
      stream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      const stream = fs.createReadStream(filePath);
      req.on('close', () => {
        stream.destroy();
      });
      stream.pipe(res);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Birthday site server running at http://localhost:${PORT}/`);
});


