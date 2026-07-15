const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const { add } = require("./helpers/math");
require("dotenv").config();

app.get("/favorites", (req, res) => {
  res.send("Favorites");
});

async function start() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server läuft auf http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

start();
