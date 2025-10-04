
const express = require("express");
const router = express.Router();
const { signup, login, getProfile, logout } = require("../controllers/authcontroller");
const isAuthenticatedUser = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", isAuthenticatedUser, getProfile);
router.post("/logout", logout);

module.exports = router;
