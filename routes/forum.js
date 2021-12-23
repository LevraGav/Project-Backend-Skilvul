const express = require("express");
const router = express.Router();

const ForumController = require("../controllers/forum.controller");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

router.get("/", ForumController.getAllForums);
router.get("/:id", ForumController.getForumbyId);
router.use(authentication);
router.post("/", authorization, ForumController.postNewForum);
router.put("/:id", authorization, ForumController.updateForumById);
router.delete("/:id", authorization, ForumController.deleteForumById);

module.exports = router;
