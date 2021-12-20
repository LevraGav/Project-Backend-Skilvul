const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
// const avatarChecker = require("../middleware/avatar-mid");

// Authentication
router.use(authentication);
router.get("/", UserController.getAllUser);

// Authorization
router.use("/:id", authorization);
router.get("/:id", UserController.getUserbyId);
router.put("/:id", UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
