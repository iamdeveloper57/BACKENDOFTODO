const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = JWT.verify(token, "ramisalive");

      req.user = await User.findById(decoded.id);
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = authMiddleware;
