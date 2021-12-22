// Import Modules
const express = require("express");
const router = express.Router();

const issueRoutes = require("./issues");

// Path forums
router.use("/issues", issueRoutes);

module.exports = router;