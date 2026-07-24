const mongoose = require("mongoose");

const historicalRateSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    rates: {
        USD: {
            type: Number,
            required: true
        },
        EUR: {
            type: Number,
            required: true
        },
        GBP: {
            type: Number,
            required: true
        },
    }
});

module.exports = mongoose.model("HistoricalRateSchema", historicalRateSchema);