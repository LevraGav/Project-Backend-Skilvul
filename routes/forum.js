const express = require("express");
const router = express.Router();

const ForumController = require("../controllers/forum.controller");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

router.post("/", authentication, authorization, ForumController.postNewForum);
router.get("/",  ForumController.getAllForums);
router.get("/:id", ForumController.getForumbyId);
router.put("/:id", authentication, authorization, ForumController.updateForumById);
router.delete("/:id", authentication, authorization, ForumController.deleteForumById);

module.exports = router;