const express = require("express");
const router = express.Router();
const historicalRateModel = require("../models/HistoricalRate.model");

router.get("/", async (req, res) => {
    try {
        const historicalRateList = await historicalRateModel.find();
        res.send(historicalRateList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;