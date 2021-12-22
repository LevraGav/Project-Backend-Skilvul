const express = require("express");
const router = express.Router();

const FavoriteIssuesController = require("../controllers/favoriteissues.controller");
// const authentication = require("../middleware/authentication");

// Authentication
// router.use(authentication);
router.get("/", FavoriteIssuesController.getAllFavoriteIssues);
router.post("/", FavoriteIssuesController.postNewFavoriteIssues);

module.exports = router;