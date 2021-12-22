const express = require("express");
const router = express.Router();

const IssueController = require("../controllers/issue.controller");
// const authentication = require("../middleware/authentication");
// const authorization = require("../middleware/authorization");

router.post("/", IssueController.postNewIssue);
router.get("/",  IssueController.getAllIssues);
router.get("/:id", IssueController.getIssuebyId);
router.get("/issues/forums/:id", IssueController.getIssuebyForumId);
router.get("/issues/search", IssueController.getIssuebyQuery);
router.put("/:id", IssueController.updateIssueById);
router.delete("/:id", IssueController.deleteIssueById);

module.exports = router;