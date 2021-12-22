const express = require("express");
const router = express.Router();

const MessageController = require("../controllers/message.controller");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Authentication
router.use(authentication);
router.get("/", MessageController.getAllMessage);
router.post("/", MessageController.postNewMessage);
router.delete("/:id", authorization, MessageController.deleteMessageById)

module.exports = router;