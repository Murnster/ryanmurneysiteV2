require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const emailjs = require('@emailjs/nodejs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/email", (req, res) => {
  emailjs
    .send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, req.body, {
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY,
    })
    .then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (err) {
        console.log('FAILED...', err);
      },
    );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
