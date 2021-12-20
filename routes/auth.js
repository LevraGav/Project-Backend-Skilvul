const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const roleChecker = require("../middleware/roles-mid");

// Register
router.post("/signup", roleChecker, AuthController.Register);

// Login
router.post("/login", AuthController.Login);

module.exports = router;
