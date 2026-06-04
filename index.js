const express = require("express");
const mongoose = require("mongoose");
const config = require("./scripts/config");

const app = express();
const port = 3000;

const connectionString = `mongodb+srv://henningotte91_db_user:${config.mongoPassword}@currencycluster.pgcrntc.mongodb.net/?appName=CurrencyCluster`;

console.log(config.mongoPassword);


app.get("/favorites", (req, res) => {
    res.send("Favorites Page");
});

mongoose.connect(connectionString).then(() => {
    console.log("Connected to MongoDB");    
}).catch((error) => {
    console.error(error);    
});