
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password });
    sendToken(user, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email }).select("+password") || await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    sendToken(user, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

exports.logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  res.status(200).json({ success: true, message: "Logged out" });
};
