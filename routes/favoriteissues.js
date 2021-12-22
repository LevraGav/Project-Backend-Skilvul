const express = require("express");
const router = express.Router();

const FavoriteIssuesController = require("../controllers/favoriteissues.controller");
const authentication = require("../middleware/authentication");

// Authentication
router.use(authentication);
router.get("/", FavoriteIssuesController.getAllFavoriteIssues);
router.get("/user/:id", FavoriteIssuesController.getFavoriteIssuesByUserId);
router.post("/", FavoriteIssuesController.postNewFavoriteIssues);
router.delete("/:id", FavoriteIssuesController.deleteFavoriteIssueById);

module.exports = router;