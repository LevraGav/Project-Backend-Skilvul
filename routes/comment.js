const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment.controller");
const authentication = require("../middleware/authentication");

router.get("/", CommentController.getAllComments);
router.get("/:id", CommentController.getCommentById);
router.get("/issue/:id", CommentController.getCommentByIssueId);
// Authentication
router.use(authentication);
router.post("/issue/:id", CommentController.postNewComment);
router.post("/:id", CommentController.postNewRepComment);
router.delete("/:id", CommentController.deleteCommentById);

module.exports = router;
