const express = require("express");
const ForumController = require("../controllers/forum.controller");
const router = express.Router();

router.post("/", ForumController.postNewForum);
router.get("/", ForumController.getAllForum);
router.get("/:id", ForumController.getForumbyId);
router.put("/:id", ForumController.updateForumById);
router.delete("/:id", ForumController.deleteForumById);

module.exports = router;