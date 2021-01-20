/* eslint-disable no-console */

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello expressjs!');
});

app.get('/echo/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
