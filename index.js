const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = 3000;

const connectionString = `mongodb+srv://henningotte91_db_user:${process.env.PASSWORD}@currencycluster.pgcrntc.mongodb.net/?appName=CurrencyCluster`;

console.log(process.env.TEST_PASSWORD);


app.get("/favorites", (req, res) => {
    res.send("Favorites Page");
});

mongoose.connect(connectionString).then(() => {
    console.log("Connected to MongoDB");    
}).catch((error) => {
    console.error(error);    
});