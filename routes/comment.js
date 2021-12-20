const express = require("express");
const CommentController = require("../controllers/comment.controller");
const router = express.Router();

router.get("/", CommentController.getAllComments);
router.get("/:id", CommentController.getCommentById);
router.post("/", CommentController.postNewComment);
router.post("/:id", CommentController.postNewRepComment);

module.exports = router;