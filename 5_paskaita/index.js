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
  cart.push(item);
  res.send(item);
});

app.get("/cart/item/:id", (req, res) => {
  const id = req.params.id;
  const foundId = cart.find((item) => item.id === +id);
  res.send(foundId); 
});

app.listen(port, () => {
    console.log(`Server is runing on port  ${port}`)
});