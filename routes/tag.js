const express = require("express");
const router = express.Router();

const TagController = require("../controllers/tag.controller");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

router.post("/", authentication, authorization, TagController.postNewTag);
router.get("/", TagController.getAllTags);
router.get("/:id", TagController.getTagbyId);
router.put("/:id",  authentication, authorization, TagController.updateTagById);
router.delete("/:id",  authentication, authorization, TagController.deleteTagById);

module.exports = router;