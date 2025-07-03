const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


app.post("/order", (req, res) => {
  const newOrder = req.body;

  fs.readFile("orders.json", (err, data) => {
    const orders = err ? [] : JSON.parse(data);
    orders.push(newOrder);

    fs.writeFile("orders.json", JSON.stringify(orders, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving order");
      res.status(201).send({ message: "Order received!" });
    });
  });
});


app.get("/orders", (req, res) => {
  fs.readFile("orders.json", (err, data) => {
    if (err) return res.status(500).send("Error reading orders");
    const orders = JSON.parse(data);
    res.json(orders);
  });
});

app.listen(PORT, () => {
  console.log(`Nzija backend running at http://localhost:${PORT}`);
});
