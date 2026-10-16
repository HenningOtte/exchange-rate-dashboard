const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const TOKEN_EXPIRES_IN_SECONDS = 7 * 24 * 60 * 60;

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET,
    {
      expiresIn: TOKEN_EXPIRES_IN_SECONDS,
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

module.exports = { generateToken, verifyToken, TOKEN_EXPIRES_IN_SECONDS };
