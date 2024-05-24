const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to serve static files
function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal Server Error');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve the HTML file
    serveFile(res, path.join(__dirname, 'index.html'), 'text/html');
  } else if (req.method === 'POST' && req.url === '/submit') {
    // Handle form submission
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = JSON.parse(body);

      
      console.log('Form Data:', formData);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Form submitted successfully!' }));
    });
  } else if (req.method === 'GET' && req.url === '/database.json') {
    // Serve the database.json file
    serveFile(res, path.join(__dirname, 'database.json'), 'application/json');
  } else if (req.url.endsWith('.js')) {
    // Serve JavaScript files
    serveFile(res, path.join(__dirname, req.url), 'application/javascript');
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
