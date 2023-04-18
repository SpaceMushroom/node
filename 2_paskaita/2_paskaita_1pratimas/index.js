const express = require("express"); //express modulio importavimas
const cors = require("cors"); // importuojam CORS
const app = express();  // aplikacijos sukurimas
app.use(cors());  //paleidziam cors
app.use(express.json()); 

const port = 3000;  // porto (kanalo) skaicius

const cars = ["Ignas"];

//routas (kelias) route/path
// get grazink duomenis
app.get("/cars", (req, res) => {
    //req - request (kas ateina is isores) uzklausa
    //res -  response (kas ateina is vidaus) atsakymas
    res.send(cars) // send metodas issiuncia duomenis
})

// siunciam ir grazinam
app.post("/cars", (req, res) => {
    const car = req.body.name;
    cars.push(car);
    res.send(req.body);
})


// serverio paleidimas
app.listen(port, () => {
    console.log(`Server is listening on port  ${port}`)
})