const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();
const roleChecker = require("../middleware/roles-mid");

router.get("/", UserController.getAllUser); // semua user yang udah login
router.get("/:id", UserController.getUserbyId); // admin atau member yang punya id tersebut
router.put("/:id", UserController.updateUserById); // admin atau member yang punya id tersebut
router.delete("/:id", UserController.deleteUserById); // admin atau member yang punya id tersebut

module.exports = router;
