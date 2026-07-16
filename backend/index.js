const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(express.json());

const currencySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creationDate: String,
});

const CurrencyModel = mongoose.model("Currency", currencySchema);

app.post("/currencies", async (req, res) => {
  try {
    const newCurrency = await CurrencyModel.create(req.body);
    res.status(201).json(newCurrency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/currencies", async (req, res) => {
  try {
    const currenciesList = await CurrencyModel.find();
    res.send(currenciesList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

async function start() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

start();
