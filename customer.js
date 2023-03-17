const express = require('express');
const app = express();
const connection = require('./database');

const data_customer = `
  SELECT customer.*, tipe_diskon.nama_tipe_diskon
  FROM customer
  INNER JOIN tipe_diskon ON customer.nama_tipe_diskon = tipe_diskon.id_tipe_diskon
`;

let customers = [];

module.exports = { app, customers };

app.get('/customers', (req, res) => {
  connection.query(data_customer, (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).send({ error: 'Error querying database' });
    } else {
      customers = results.map(result => ({
        id_cust: result.id_cust,
        nama_cust: result.nama_cust,
        contact: result.contact,
        email: result.email,
        alamat: result.alamat,
        diskon: result.diskon,
        nama_tipe_diskon: result.nama_tipe_diskon,
        ktp: result.ktp
      }));
      if (customers.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ customers }));
      } else {
        res.status(404).send({ error: 'No customers found' });
      }
    }
  });
});
  