// Import Modules
const express = require("express");
const router = express.Router();

const commentRoutes = require("./comment");

// Path comments
router.use("/comments", commentRoutes);

module.exports = router;