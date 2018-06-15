const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

const TABLE_COUNT = 5;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const reservations = [];
let currentID = 0;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname, 'view.html'));
});

app.get('/query', (req, res) => {
  res.json(reservations);
});

app.get('/make', (req, res) => {
  res.sendFile(path.join(__dirname, 'make.html'));
});

app.post('/make', (req, res) => {
  const reservation = req.body;

  reservation.id = currentID++;

  let status;

  if (reservations.length < TABLE_COUNT) {
    reservations.push(reservation);

    status = 'Success';
  } else {
    status = 'NoMoreTables';
  }

  res.json({ status });
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`); // eslint-disable-line no-console
});
