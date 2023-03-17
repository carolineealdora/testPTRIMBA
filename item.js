const express = require('express');
const app = express();
const connection = require('./database');


const data_item = `
  SELECT item.*, unit.nama_unit
  FROM item
  INNER JOIN unit ON item.nama_unit = unit.id_unit
`;

let items = [];

module.exports = { app, items };

app.get('/items', (req, res) => {
  connection.query(data_item, (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).send({ error: 'Error querying database' });
    } else {
      // console.log('Results:', results);
      items = results.map(result => ({
        id_item: result.id_item,
        nama_item: result.nama_item,
        nama_unit: result.nama_unit,
        harga_satuan: result.harga_satuan,
        gambar_barang: result.gambar_barang
      }));
      if (items.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ items }));
      } else {
        res.status(404).send({ error: 'No items found' });
      }
    }
  });
});