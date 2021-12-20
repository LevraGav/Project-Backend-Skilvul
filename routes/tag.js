const express = require("express");
const TagController = require("../controllers/tag.controller");
const router = express.Router();

router.post("/", TagController.postNewTag);
router.get("/", TagController.getAllTag);
router.get("/:id", TagController.getTagbyId);
router.put("/:id", TagController.updateTagById);
router.delete("/:id", TagController.deleteTagById);

module.exports = router;