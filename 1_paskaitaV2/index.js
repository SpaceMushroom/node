const express = require("express"); //express modulio importavimas
const app = express();  // aplikacijos sukurimas
const port = 3000;  // porto (kanalo) skaicius

//routas (kelias) route/path
// get grazink duomenis
app.get("/", (req, res) => {
    //req - request (kas ateina is isores) uzklausa
    //res -  response (kas ateina is vidaus) atsakymas
    res.send("Mano vardas yra Ignas Grinius") // send metodas issiuncia duomenis
})
app.get("/today", (req, res) => {
    res.send(new Date().toDateString())
})

app.get("/user", (req, res) => {
    const user = {
        name: "Ignas",
        surname: "Grinius"
    }
    res.send(user)
})

// serverio paleidimas
app.listen(port, () => {
    console.log(`Server is listening on port  ${port}`)
})
