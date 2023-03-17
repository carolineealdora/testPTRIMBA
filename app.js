const mysql = require('mysql');
const http = require('http');
const fs = require('fs');
const path = require('path');
const itemApp = require('./item.js');
const customerApp = require('./customer.js');
const salesApp = require('./sales.js');

function serveFile(req, res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error loading ${filePath}: ${err}`);
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {

  if (req.url === '/') {
    const filePath = path.join(__dirname, 'index.html');
    serveFile(req, res, filePath, 'text/html');
    return;
  }

  if (req.url === '/item.html') {
    const filePath = path.join(__dirname, 'item.html');
    serveFile(req, res, filePath, 'text/html');
    return;
  }

  if (req.url === '/items') {
    itemApp.app(req, res);
    return;
  }
  if (req.url === '/customer.html') {
    const filePath = path.join(__dirname, 'customer.html');
    serveFile(req, res, filePath, 'text/html');
    return;
  }

  if (req.url === '/customers') {
    customerApp.app(req, res);
    return;
  }

  if (req.url === '/sales.html') {
    const filePath = path.join(__dirname, 'sales.html');
    serveFile(req, res, filePath, 'text/html');
    return;
  }

  if (req.url === '/sales') {
    salesApp.app(req, res);
    return;
  }
  res.end();
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});