const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");
const port = 3000;
require("dotenv").config();
const favoriteRouter = require("./routes/favorites.routes");
const userRouter = require("./routes/users.routes");

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

app.use(cors());

app.use(express.json());
app.use("/favorites", favoriteRouter);
app.use("/users", userRouter);

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
