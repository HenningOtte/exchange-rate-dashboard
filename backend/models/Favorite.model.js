const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },

  state: {
    converter: {
      initialValue: {
        type: String,
        required: true,
      },
      targetValue: {
        type: String,
        required: true,
      },
      sourceCurrency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        required: true,
      },
      targetCurrency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        required: true,
      },
      historicalDate: {
        type: String,
        required: true,
      },
      isHistorical: {
        type: Boolean,
        required: true,
      },
    },
    dashboard: {
      dateFrom: {
        type: String,
        required: true,
      },
      dateTo: {
        type: String,
        required: true,
      },
    },
  },
});

favoriteSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

favoriteSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
