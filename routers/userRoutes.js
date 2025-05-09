const router = require("express").Router();
const userController = require("../controllers/userController");

const rateLimit = require("express-rate-limit");
const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "too many request",
});

// create new user
router.post("/signup", limit, userController.createUser);
router.post("/login", userController.loginUser);

module.exports = router;
