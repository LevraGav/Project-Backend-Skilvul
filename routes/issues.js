const express = require("express");
const router = express.Router();

const IssueController = require("../controllers/issue.controller");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

router.get("/", IssueController.getAllIssues);
router.get("/:id", IssueController.getIssuebyId);
router.get("/forums/:id", IssueController.getIssuebyForumId);

router.use(authentication);
router.post("/", authorization, IssueController.postNewIssue);
router.put("/:id", authorization, IssueController.updateIssueById);
router.delete("/:id", authorization, IssueController.deleteIssueById);

module.exports = router;
