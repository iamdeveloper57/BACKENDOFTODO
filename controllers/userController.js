const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
      console.log("user exists");
      return res.status(404).json({ message: "user exists" });
    }
    if (!username) {
      res.send("please enter the username");
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      console.log("user created");
      res.status(201).json(newUser, { message: "user created" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.comparePassword(password))) {
      const payload = { id: user._id, username: user.username };
      const token = JWT.sign(payload, "ramisalive", { expiresIn: "7h" });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
