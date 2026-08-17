const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET,
    {
      expiresIn: "7d",
    },
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
