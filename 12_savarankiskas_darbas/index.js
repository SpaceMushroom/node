const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/memberships', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('services').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/memberships', async (req, res) => {
  try {
    const membership = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('services')
      .insertOne(membership);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/memberships/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('services')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'services',
            localField: 'service_id',
            foreignField: '_id',
            as: 'membership',
          },
        },
        {
          $unwind: '$membership',
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.get('/users/:order', async (req, res) => {
  try {
    const { order } = req.params;
    const sort = order === 'asc' ? 1 : -1;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'services',
            localField: 'service_id',
            foreignField: '_id',
            as: 'membership',
          },
        },
        {
          $unwind: '$membership',
        },
        {
          $sort: {
            first_name: sort,
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      ip: req.body.ip,
      service_id: new ObjectId(req.body.service_id),
    };
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').insertOne(user);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
