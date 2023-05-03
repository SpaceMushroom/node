const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient } = require('mongodb');

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());

const URI = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(URI);

app.get('/restaurants', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('restaurants')
      .collection('insertDocument')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/restaurants', async (req, res) => {
  try {
    const restaurant = req.body;
    const con = await client.connect();
    const data = await con
      .db('restaurants')
      .collection('insertDocument')
      .insertOne(restaurant);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is runing on port  ${port} port .....`);
});
