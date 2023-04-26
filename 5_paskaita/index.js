const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const cart = [];

app.get("/cart", (req, res) => {
    res.send(cart); 
});

app.post("/cart", (req, res) => {
  const item = req.body;
  //item.id = cart.length + 1;  //pridedamas ID automatiskai pagal krep6elio ilgi
  cart.push(item);
  res.send(item);
  res.status(201).send(item); // grazina http statusa kuris nurodo responce busena
});

app.get("/cart/item/:id", (req, res) => {
  const id = req.params.id;
  const foundId = cart.find((item) => item.id === +id);
  if (!foundId) {
    res.status(404).send("Item not found")
  } else {
    res.send(foundId); 
  }
});

app.listen(port, () => {
    console.log(`Server is runing on port  ${port}`)
});