const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header

  // Check if no token
  if (!req.header("x-auth-token")) {
    try {
      req.user = undefined;
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Server Error!" });
    }
  } else {
    // Verify token
    try {
      const token = req.header("x-auth-token");
      const decoded = jwt.verify(token, config.get("jwtSecret"));

      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  }
};
