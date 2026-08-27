const { verifyToken } = require("../helpers/jwt");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];
  const validToken = verifyToken(token);

  if (!validToken) {
    return res.status(400).json({
      success: false,
      message: "Invalid token.",
    });
  }

  next();
};

module.exports = authenticate;
