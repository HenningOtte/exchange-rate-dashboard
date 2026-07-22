const express = require("express");
const router = express.Router();
const historicalRateModel = require("../models/HistoricalRate.model");

router.post("/", async (req, res) => {
    try {
        const newHistoricalRate = await historicalRateModel.create(req.body);
        res.status(201).json({ message: "Historical-Rate created successfully." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const historicalRateList = await historicalRateModel.find();
        res.send(historicalRateList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;