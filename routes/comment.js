const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment.controller");
const authentication = require("../middleware/authentication");

// Authentication
router.use(authentication);
router.get("/", CommentController.getAllComments);
router.get("/:id", CommentController.getCommentById);
router.get("/issue/:id", CommentController.getCommentByIssueId)
router.post("/", CommentController.postNewComment);
router.post("/:id", CommentController.postNewRepComment);

module.exports = router;