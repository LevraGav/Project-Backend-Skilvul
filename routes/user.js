const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();
const roleChecker = require("../middleware/roles-mid");

router.post("/", roleChecker, UserController.createNewUser);
router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getUserbyId);
router.put("/:id", roleChecker, UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
