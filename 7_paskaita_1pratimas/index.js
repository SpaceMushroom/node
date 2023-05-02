const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());

const posts = [];

app.get('/posts', (req, res) => {
  res.send(posts);
});
// {id, title, description}
app.post('/posts', (req, res) => {
  // surandamas didžiausias ID
  const maxId = posts.reduce((max, post) => (post.id > max ? post.id : max), 0);
  const post = req.body;
  const newPost = { id: maxId + 1, ...post };
  posts.push(newPost);
  res.send(newPost);
});

app.get('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const foundPost = posts.find((post) => post.id === id);
  if (!foundPost) {
    res.status(404).send({ message: 'Post not found' });
  } else {
    res.send(foundPost);
  }
});

app.put('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    const updatingPost = { id, ...req.body };
    posts.splice(index, 1, updatingPost);
    res.send(updatingPost);
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
});

app.delete('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    res.status(404).send({ message: 'Post not found' });
  } else {
    const deletingPost = posts.find((post) => post.id === id);
    posts.splice(index, 1);
    res.send(deletingPost);
  }
});

app.listen(port, () => {
  console.log(`Server is runing on port  ${port} .....`);
});
