const express = require('express');
const cors = require('cors');
require('dotenv').config();
// proces.env tai yra objektas sukurtas is musu .enc failo
const port = process.env.PORT || 8080; // jei port neras naudos 8080
const app = express();
app.use(cors());
app.use(express.json());

const tickets = [];

app.get('/tickets', (req, res) => {
  res.send(tickets);
});

app.post('/tickets', (req, res) => {
  const ticket = req.body;
  tickets.push(ticket);
  res.send(ticket);
});

app.get('/ticket/:id', (req, res) => {
  const id = req.params.id;
  const foundId = tickets.find((item) => item.id === +id);
  if (!foundId) {
    res.status(404).send('Item not found');
  } else {
    res.send(foundId);
  }
});

app.listen(port, () => {
  console.log(`Server is runing on port  ${port} .....`);
});
