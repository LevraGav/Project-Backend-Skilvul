const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

// Register
router.post("/register", AuthController.Register);

// Login
router.post("/login", AuthController.Login);

module.exports = router;
