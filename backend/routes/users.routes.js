const express = require("express");
const router = express.Router();
const userModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { body, validationResult } = require("express-validator");

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
      if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstname, lastname, email, password } = req.body;

      const hash = await bcrypt.hash(password, saltRounds);
      const newUser = await userModel.create({
        firstname,
        lastname,
        email,
        password: hash,
      });
      res.status(201).json({ message: "User is created" });
    } catch (error) {
      res.status(400).json({ message: error.message });
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
        sucess: login, message: "", data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
        }
      });
    } else {
      res.status(400).json({
        sucess: login, message: "Incorrect password.", data: {
          firstname: "",
          lastname: "",
          email: email,
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      sucess: false, message: "Email not found.", data: {
        firstname: "",
        lastname: "",
        email: "",
      }
    });
  }
});

module.exports = router;
