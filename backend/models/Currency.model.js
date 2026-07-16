const mongoose = require("mongoose");

const currencySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creationDate: String,
});

currencySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

currencySchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Currency", currencySchema);
