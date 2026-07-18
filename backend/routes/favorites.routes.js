const express = require("express");
const router = express.Router();
const favoriteModel = require("../models/Favorite.model");
const { body, validationResult, param } = require("express-validator");

router.post(
  "/",
  [
    param("id").isMongoId().withMessage("Invalid favorite id"),
    body("name").notEmpty().withMessage("Name is required"),
    body("creationDate").notEmpty().withMessage("Date is required"),
    body("state.converter.initialValue")
      .notEmpty()
      .withMessage("Initial-Value is required"),
    body("state.converter.targetValue")
      .notEmpty()
      .withMessage("Target-Value is required"),
    body("state.converter.sourceCurrency")
      .isIn(["USD", "EUR", "GBP"])
      .withMessage("Invalid source currency"),
    body("state.converter.targetCurrency")
      .isIn(["USD", "EUR", "GBP"])
      .withMessage("Invalid target currency"),
    body("state.converter.historicalDate")
      .notEmpty()
      .withMessage("isHistorical must be a boolean"),
    body("state.converter.isHistorical")
      .notEmpty()
      .withMessage("Is Historical"),
    body("state.dashboard.dateFrom")
      .notEmpty()
      .withMessage("DateFrom is required"),
    body("state.dashboard.dateTo").notEmpty().withMessage("DateTo is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newFavorite = await favoriteModel.create(req.body);
      res.status(201).json(newFavorite);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

router.get("/", async (req, res) => {
  try {
    const favoriteList = await favoriteModel.find();
    res.send(favoriteList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Favorite = await favoriteModel.findById(id);

    if (!Favorite) {
      return res.status(404).json({ message: "Favorite Not Found!" });
    }

    res.status(200).json(Favorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put(
  "/:id",
  [
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("creationDate").optional().notEmpty().withMessage("Date is required"),
    body("state.converter.initialValue")
      .optional()
      .notEmpty()
      .withMessage("Initial-Value is required"),
    body("state.converter.targetValue")
      .optional()
      .notEmpty()
      .withMessage("Target-Value is required"),
    body("state.converter.sourceCurrency")
      .optional()
      .isIn(["USD", "EUR", "GBP"])
      .withMessage("Invalid source currency"),
    body("state.converter.targetCurrency")
      .optional()
      .isIn(["USD", "EUR", "GBP"])
      .withMessage("Invalid target currency"),
    body("state.converter.historicalDate")
      .optional()
      .notEmpty()
      .withMessage("isHistorical must be a boolean"),
    body("state.converter.isHistorical")
      .optional()
      .notEmpty()
      .withMessage("Is Historical"),
    body("state.dashboard.dateFrom")
      .optional()
      .notEmpty()
      .withMessage("DateFrom is required"),
    body("state.dashboard.dateTo")
      .optional()
      .notEmpty()
      .withMessage("DateTo is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const updateFavorite = await favoriteModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        },
      );

      if (!updateFavorite) {
        return res.status(404).json({ message: "Favorite Not Found!" });
      }
      res
        .status(200)
        .json({ message: "Favorite Updated Successfully", updateFavorite });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deltedFavorite = await favoriteModel.findByIdAndDelete(id);

    if (!deltedFavorite) {
      return res.status(404).json({ message: "Favorite Not Found!" });
    }
    res.status(200).json({ message: "Favorite Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
