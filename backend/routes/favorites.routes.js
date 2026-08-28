const express = require("express");
const router = express.Router();
const favoriteModel = require("../models/Favorite.model");
const { verifyToken } = require("../helpers/jwt");

const {
  createFavoriteValidation,
  updateFavoriteValidation,
  handleValidationErrors,
} = require("../validators/favorite.validator");

router.post(
  "/",
  createFavoriteValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      req.body.userId = req.userId;
      const newFavorite = await favoriteModel.create(req.body);
      res.status(201).json([{ message: "Favorite created successfully." }]);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

router.get("/", async (req, res) => {
  try {
    const favoriteList = await favoriteModel.find({
      userId: req.userId,
    });
    res.send(favoriteList);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const favorite = await favoriteModel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.send(favorite);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put(
  "/:id",
  updateFavoriteValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updateFavorite = await favoriteModel.findOneAndUpdate(
        {
          _id: id,
          userId: req.userId,
        },
        req.body,
        {
          new: true,
        },
      );

      if (!updateFavorite) {
        return res.status(404).json({
          success: false,
          message: "Favorite Not Found!",
        });
      }

      res
        .status(200)
        .json({ message: "Favorite Updated Successfully", updateFavorite });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
);

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFavorite = await favoriteModel.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deletedFavorite) {
      return res.status(404).json({ message: "Favorite Not Found!" });
    }
    res.status(200).json({ message: "Favorite Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
