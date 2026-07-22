const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Favorite name must be at least 3 characters"],
    maxlength: [50, "Favorite name cannot exceed 50 characters"],
  },
  creationDate: {
    type: String,
    required: true,
  },

  state: {
    converter: {
      initialValue: {
        type: String,
        required: [true, "Initial value is required"],
      },
      targetValue: {
        type: String,
        required: true,
      },
      sourceCurrency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        required: [true, "Source currency is required"],
      },
      targetCurrency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        required: [true, "Target currency is required"],
      },
      historicalDate: {
        type: String,
      },
      isHistorical: {
        type: Boolean,
      },
    },
    dashboard: {
      dateFrom: {
        type: String,
      },
      dateTo: {
        type: String,
      },
    },
  },
});

favoriteSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

favoriteSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
