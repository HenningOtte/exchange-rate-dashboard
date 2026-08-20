const express = require("express");
const router = express.Router();
const userModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { body, validationResult } = require("express-validator");
const { generateToken, verifyToken } = require("../helpers/jwt");

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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    const { firstname, lastname } = user;
    const login = bcrypt.compareSync(password, user.password);

    if (login) {
      res.status(200).json({
        success: login,
        message: "",
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
        },
        token: generateToken(user),
      });
    } else {
      res.status(400).json({
        success: login,
        message: "Incorrect password.",
        data: {
          firstname: "",
          lastname: "",
          email: email,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Email not found.",
      data: {
        firstname: "",
        lastname: "",
        email: "",
      },
    });
  }
});

router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided.",
        data: {
          firstname: "",
          lastname: "",
          email: "",
        },
      });
    }

    const token = authHeader.split(" ")[1];

    const validToken = verifyToken(token);
    const user = await userModel.findById(validToken.id);

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
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
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
