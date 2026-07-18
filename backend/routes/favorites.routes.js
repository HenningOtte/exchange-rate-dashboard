const express = require("express");
const router = express.Router();
const favoriteModel = require("../models/Favorite.model");

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
  updateFavoriteValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
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
