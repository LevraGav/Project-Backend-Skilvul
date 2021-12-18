const express = require("express");
const UserController = require("../controllers/user.controller");
const rolesChecker = require("../middleware/roles-mid");
const router = express.Router();

router.post("/", rolesChecker, UserController.createNewUser);
router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getUserbyId);
router.put("/:id", UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
