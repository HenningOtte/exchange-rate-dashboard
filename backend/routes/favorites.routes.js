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
      const newFavorite = await favoriteModel.create(req.body);
      res.status(201).json([{ message: "Favorite created successfully." }]);
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];
  const validToken = verifyToken(token);

  if (validToken.id) {
    try {
      const { id } = req.params;
      const favorite = await favoriteModel.findById(id);
      res.send(favorite);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid token.",
    });
  }
});

function validateAuth(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return {
      success: false,
      message: "No token provided.",
    };
  }

  const token = authHeader.split(" ")[1];

  if (!verifyToken(token)) {
    return {
      success: false,
      message: "Invalid token.",
    };
  } else {
    return {
      success: true,
      message: "Token is verified.",
    };
  }
}

router.put(
  "/:id",
  updateFavoriteValidation,
  handleValidationErrors,
  async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    const validToken = verifyToken(token);

    if (validToken) {
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
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid token.",
      });
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
