const express = require("express");
const router = express.Router();
const userModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { body, validationResult } = require("express-validator");
const { generateToken, TOKEN_EXPIRES_IN_SECONDS } = require("../helpers/jwt");
const authenticate = require("../middleware/auth.middleware");

router.post(
  "/register",
  [
    body("firstname").notEmpty().withMessage("Firstname ist required"),
    body("lastname").notEmpty().withMessage("Lastname is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must have at least 8 characters."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = [];

        errors.array().forEach((error) => {
          errorMessage.push({
            success: false,
            path: error.path,
            msg: error.msg,
          });
        });
        return res.status(400).json(errorMessage);
      }

      const { firstname, lastname, email, password } = req.body;

      const hash = await bcrypt.hash(password, saltRounds);
      const newUser = await userModel.create({
        firstname,
        lastname,
        email,
        password: hash,
      });
      res.status(201).json([
        {
          success: true,
          path: "success",
          msg: "User created successfully.",
        },
      ]);
    } catch (error) {
      res.status(400).json([
        {
          success: false,
          path: "server",
          msg: "An unexpected server error occurred.",
        },
      ]);
    }
  },
);

router.post("/logout", async (req, res) => {
  res.clearCookie("authcookie", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Successfully logged out.",
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email not found.",
      });
    }

    const login = bcrypt.compareSync(password, user.password);

    if (!login) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }
    res.cookie("authcookie", generateToken(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: TOKEN_EXPIRES_IN_SECONDS * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "",
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        data: {
          firstname: "",
          lastname: "",
          email: "",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Failed to fetch current user:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: {
        firstname: "",
        lastname: "",
        email: "",
      },
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    const login = bcrypt.compareSync(password, user.password);

    if (!login) {
      return res.status(400).json({ message: "Password was incorrect!" });
    }

    const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateUser) {
      return res.status(400).json({ message: "User Not Found!" });
    }

    res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
