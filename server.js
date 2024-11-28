const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

// Create the server
http.createServer((req, res) => {
  let filePath = req.url === '/' ? './index.html' : `.${req.url}`;

  if (req.url === '/api/getLastLogin') {
    // Handle GET request to read last login time
    fs.readFile('lastDate.txt', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error reading file' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ lastLogin: data }));
      }
    });
    return;
  }

  if (req.url === '/api/setLastLogin' && req.method === 'POST') {
    // Handle POST request to save current login time
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const currentDate = JSON.parse(body).currentDate;
      fs.writeFile('lastDate.txt', currentDate, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error writing to file' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'File saved successfully!' }));
        }
      });
    });
    return;
  }

  // Serve static files (HTML, CSS, JS)
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.ico':
      contentType = 'image/x-icon';
      break;
    default:
      contentType = 'text/html';
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
