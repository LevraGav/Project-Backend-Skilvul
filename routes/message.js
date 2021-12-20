const express = require("express");
const MessageController = require("../controllers/message.controller");
const router = express.Router();

router.get("/", MessageController.getAllMessage);
router.post("/", MessageController.postNewMessage);

module.exports = router;