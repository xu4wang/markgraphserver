'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = {};

app.use(express.json());

app.get('/store/:key', (req, res) => {
  res.json({ data: db[req.params.key] });
});

app.delete('/store/:key', (req, res) => {
  delete db[req.params.key];
  res.json({ data: db[req.params.key] });
});

app.post('/store/:key', (req, res) => {
  db[req.params.key] = req.body;
  res.status(201).json({
    status: 'OK'
  });
});

app.get('/keys', (req, res) => {
  const dbKeys = Object.keys(db);
  res.json({ data: dbKeys });
});

app.get('/dbinfo', (req, res) => {
  const dbKeys = Object.keys(db);

  const info = {
    size: dbKeys.length
  };

  if (req.query.details === 'true') {
    info.keys = dbKeys;
  }

  res.json(info);
});



app.get('/', (req, res) => {
  res.json({
    appName: process.env.npm_package_name,
    appVersion: process.env.npm_package_version
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});

module.exports = app;
