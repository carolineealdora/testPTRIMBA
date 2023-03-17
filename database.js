const mysql = require('mysql');
const http = require('http');
const fs = require('fs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ptrimba_inventorypenjualan'
  });

connection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to database');
});

module.exports = connection;