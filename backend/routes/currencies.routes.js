const express = require("express");
const router = express.Router();
const CurrencyModel = require("../models/Currency.model");

router.post("/", async (req, res) => {
  try {
    const newCurrency = await CurrencyModel.create(req.body);
    res.status(201).json(newCurrency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const currenciesList = await CurrencyModel.find();
    res.send(currenciesList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const currency = await CurrencyModel.findById(id);

    if (!currency) {
      return res.status(404).json({ message: "Currency Not Found!" });
    }

    res.status(200).json(currency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateCurrency = await CurrencyModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateCurrency) {
      return res.status(404).json({ message: "Currency Not Found!" });
    }
    res
      .status(200)
      .json({ message: "Currency Updated Successfully", updateCurrency });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deltedCurrency = await CurrencyModel.findByIdAndDelete(id);

    if (!deltedCurrency) {
      return res.status(404).json({ message: "Currency Not Found!" });
    }
    res.status(200).json({ message: "Currency Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
