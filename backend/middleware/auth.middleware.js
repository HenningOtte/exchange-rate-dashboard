const { verifyToken } = require("../helpers/jwt");

const authenticate = (req, res, next) => {
  const token = req.cookies.authcookie;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided.",
    });
  }

  const validToken = verifyToken(token);

  if (!validToken) {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }

  req.userId = validToken.id;
  next();
};

module.exports = authenticate;
