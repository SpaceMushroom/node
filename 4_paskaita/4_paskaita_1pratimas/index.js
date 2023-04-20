const express = require("express");
const cors = require("cors");
const data = require("./data"); //importuojam duomenis
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
    res.send(data);
});

app.get("/cars/:model", (req, res) => {
    const model = req.params.model;
    const filteredClients =  data.filter((client) => client.car.toLowerCase() === model.toLowerCase())
    res.send(filteredClients);
});

// 3
app.get("/clients/:id", (req, res) => {
    const id = req.params.id;
    // 1 === "1"
    const foundClient = data.find((client) => client.id === +id); // + arba Number(id)
    res.send(foundClient);
  });
  
  // 4 ["anb@abc.com", "abc@abc.com", "abc@acb.com]
  app.get("/emails", (req, res) => {
    const emails = data.map((client) => client.email);
    res.send(emails);
  });
  
  // 5
  app.get("/females", (req, res) => {
    const filteredFemales = data.filter((client) => client.gender === "Female");
    const femalesFullNames = filteredFemales.map(
      (female) => `${female.first_name} ${female.last_name}`
    );
    res.send(femalesFullNames);
  });

app.listen(port, () => {
    console.log(`Server is runing on port  ${port}`)
});