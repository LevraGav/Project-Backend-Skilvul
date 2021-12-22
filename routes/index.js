// Import Modules
const express = require("express");
const router = express.Router();

const favoriteissuesRoutes = require("./favoriteissues");

// Path forums
router.use("/favoriteissues", favoriteissuesRoutes);

module.exports = router;