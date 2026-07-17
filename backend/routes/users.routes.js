const express = require("express");
const router = express.Router();
const userModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/register", async (req, res) => {
  try {
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
});

module.exports = router;
