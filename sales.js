const express = require('express');
const app = express();
const connection = require('./database');

const data_sales = `
  SELECT sales.*, customer.nama_cust, item.nama_item
  FROM sales
  INNER JOIN customer ON sales.nama_cust = customer.id_cust
  INNER JOIN item ON sales.nama_item = item.id_item
`;

let sales = [];

module.exports = { app, sales };

app.get('/sales', (req, res) => {
  connection.query(data_sales, (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).send({ error: 'Error querying database' });
    } else {
      sales = results.map(result => ({
        code_transaksi: result.code_transaksi,
        tanggal_transaksi: result.tanggal_transaksi,
        nama_cust: result.nama_cust,
        nama_item: result.nama_item,
        qty: result.qty,
        total_diskon: result.total_diskon,
        total_harga: result.total_harga,
        total_bayar: result.total_bayar
      }));
      if (sales.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ sales }));
      } else {
        res.status(404).send({ error: 'No sales found' });
      }
    }
  });
});
  

  