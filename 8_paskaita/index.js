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

app.get('/', async (req, res) => {
  try {
    const con = await client.connect(); //  prisijungia prie duomenu bazes
    const data = await con.db('uniDB').collection('students').find().toArray(); // issitraukiame duomenis is db uniDB - duomenu baze students - kolekcija
    await con.close(); // uzdarome prisijungima prie db
    res.send(data);
  } catch (error) {
    res.status(500).send(error); //  500 statusas internal server error
  }
});

app.post('/', async (req, res) => {
  try {
    const student = req.body;
    const con = await client.connect();
    const data = await con
      .db('uniDB')
      .collection('students')
      .insertOne(student);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is runing on port  ${port} port .....`);
});
