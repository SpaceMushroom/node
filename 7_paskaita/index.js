const express = require('express');
const cors = require('cors');
require('dotenv').config();
// proces.env tai yra objektas sukurtas is musu .enc failo
const port = process.env.PORT || 8080; // jei port neras naudos 8080
const app = express();
app.use(cors());
app.use(express.json());

const todos = [];

app.get('/todos', (req, res) => {
  res.send(todos);
});
// {id, title, done}
app.post('/todos', (req, res) => {
  const todo = req.body;
  const newTodo = { id: todos.length + 1, ...todo }; // pridedamas id prie siunciamo objekto
  todos.push(newTodo);
  res.send(newTodo);
});

app.get('/todos/:id', (req, res) => {
  const getId = +req.params.id;
  const foundId = todos.find((todo) => todo.id === getId);
  if (!foundId) {
    // 404 not found
    res.status(404).send({ message: 'Todo not found' });
  } else {
    res.send(foundId);
  }
});

app.put('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const index = todos.findIndex((item) => item.id === id);
  if (index !== -1) {
    const updatingTodo = { id, ...req.body }; // senas id + naujas todo
    todos.splice(index, 1, updatingTodo); // trina index ir vietoi jo iraso updatingTodo
    res.send(updatingTodo);
  } else {
    res.status(404).send({ message: 'Todo not found' });
  }
});

app.delete('/todos/:id', (req, res) => {
  const getId = +req.params.id;
  const index = todos.findIndex((item) => item.id === getId);
  // randa nuo 0 iki begalybes, jei neranda -1
  if (index === -1) {
    res.status(404).send({ message: 'Todo not found' });
  } else {
    const deletingTodo = todos.find((todo) => todo.id === getId);
    todos.splice(index, 1); // ištrina elemenetą pagal jo indexą masyve
    res.send(deletingTodo); // grazinam elementa kuri trinam
  }
});

app.listen(port, () => {
  console.log(`Server is runing on port  ${port} .....`);
});
