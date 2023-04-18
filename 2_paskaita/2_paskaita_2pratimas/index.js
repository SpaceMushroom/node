const express = require("express"); 
const cors = require("cors"); 
const app = express(); 
app.use(cors());  
app.use(express.json());
const port = 3000; 

const products = [];

app.get("/products", (req, res) => {
    res.send(products) 
})

app.post("/products", (req, res) => {
    const product = { name: req.body.name, price: req.body.price };
    products.push(product);
    res.send(product);
});

app.listen(port, () => {
    console.log(`Server is listening on port  ${port}`)
})