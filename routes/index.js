// Import Modules
const express = require("express");
const router = express.Router();

const messageRoutes = require("./message");

// Path Messages
router.use("/messages", messageRoutes);

module.exports = router;