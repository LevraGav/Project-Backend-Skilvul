// Import Modules
const express = require("express");
const router = express.Router();

const tagRoutes = require("./tag");

// Path tags
router.use("/tags", tagRoutes);

module.exports = router;