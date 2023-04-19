const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const users = [];

app.get("/users", (req, res) => {
    res.send(users)
})

app.post("/users", (req, res) => {
    const user = { pas: req.body.pas, pass: req.body.pass,email: req.body.email,name: req.body.name,surname: req.body.surname,adress: req.body.adress,zip: req.body.zip,city: req.body.city,phone: req.body.phone,agree: req.body.agree   
    };
    users.push(user);
    res.send(user);
});

app.post("/login", (req, res) => {
    const loginUser = { pas: req.body.pas, email: req.body.email };
    let msg = "";
    users.forEach((user) => {
        if (loginUser.email === user.email) {
            if (loginUser.pas === user.pas) {
                return msg = "logged in successfully";
            } else {
                return msg = "Wrong password";
            }
        } else {
            return msg = "This email NOT exist";
        }
    });
    res.send({ message: msg });
});

app.listen(port, () => {
    console.log(`Server is listening on port  ${port}`)
})