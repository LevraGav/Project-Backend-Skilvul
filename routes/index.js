// Import Modules
const express = require("express");
const router = express.Router();

const forumRoutes = require("./forum");

// Path forums
router.use("/forums", forumRoutes);

module.exports = router;