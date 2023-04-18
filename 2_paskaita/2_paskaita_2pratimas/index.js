const express = require("express"); //express modulio importavimas
const cors = require("cors"); // importuojam CORS
const app = express();  // aplikacijos sukurimas
app.use(cors());  //paleidziam cors
app.use(express.json());

const port = 3000;  // porto (kanalo) skaicius

const products = [];

//routas (kelias) route/path
// get grazink duomenis
app.get("/products", (req, res) => {
    //req - request (kas ateina is isores) uzklausa
    //res -  response (kas ateina is vidaus) atsakymas
    res.send(products) // send metodas issiuncia duomenis
})

// siunciam ir grazinam
app.post("/products", (req, res) => {
    const product = { name: req.body.name, price: req.body.price };
    products.push(product);
    res.send(product);
});

// serverio paleidimas
app.listen(port, () => {
    console.log(`Server is listening on port  ${port}`)
})