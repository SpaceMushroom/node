const express = require("express"); //express modulio importavimas
const casual = require("casual"); // casual modulio importavimas
const app = express();  // aplikacijos sukurimas
const port = 3000;  // porto (kanalo) skaicius

app.get("/randomUser", (req, res) => {
    const randomUser = {
        name: `${casual.username} ${casual.surname}`,
        country: casual.country,
        city: casual.city,
        street: casual.street,
        zip: casual.zip(digits = 5)
    }
    res.send(randomUser)
})

app.get("/randomColor", (req, res) => {
    const randomColor = casual.color_name
    res.send(randomColor)
})

app.get("/randomColors", (req, res) => {
    const randomColors = [
       casual.color_name,
       casual.color_name,
       casual.color_name,
       casual.color_name,
       casual.color_name
    ]
    res.send(randomColors)
})

app.get("/randomPlaces", (req, res) => {
    const random = casual.integer(from = 1, to = 5)
    const randomPlaces = [];
    for (let i = 0; i < random; i++) {
        const randomPlace = {
        country: casual.country,
        city: casual.city,
        adress: casual.address
        }
        randomPlaces.push(randomPlace);
    }    
    res.send(randomPlaces)
})

app.listen(port, () => {
    console.log(`Server is listening on port  ${port}`)
})   // serverio paleidimas