const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const avatarChecker = require("../middleware/avatar-mid");

// Register
router.post("/signup", AuthController.Register);

// Login
router.post("/login", AuthController.Login);

module.exports = router;
