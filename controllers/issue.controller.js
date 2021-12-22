const ISSUE_MODEL = require("../models").Issue;

class IssueController {
  // POST New Issue
	static postNewIssue(req, res) {
    try{
      const newIssue = {
        title: req.body.title,
		summary: req.body.summary,
		author_name: req.body.author_name,
        image: req.body.image,
		likes: req.body.likes,
		comments: req.body.comments,
        tag_id: req.body.tag_id,
		forum_id: req.body.forum_id
      }
      ISSUE_MODEL.create(newIssue)
        .then(result => {
        res.status(200).json({ 
          message: 'Success post new Issue!', 
          result 
         })
        })
        .catch(err => res.status(400).json({ message: err }))
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // GET All Issue
  static async getAllIssues(req, res) {
    try {
      const dataIssue = await ISSUE_MODEL.findAll();

      if (dataIssue.length != 0) {
        res.status(200).send({
          message: "Success Get All Issues",
          issues: dataIssue,
        });
      } else {
        res.status(404).send({
          message: "Data Issues is Empty",
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

	// GET Issue by Id
  static async getIssuebyId(req, res) {
    try {
      const issueID = req.params.id;

      const dataIssue = await ISSUE_MODEL.findOne({
        where: {
          id: Number(issueID),
        },
      });

      if (dataIssue) {
        res.status(200).send({
          message: `Success Get Issue Id ${issueID}`,
          Issues: dataIssue,
        });
      } else {
        res.status(404).send({
          message: `Data Issue Id ${issueID} Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

	// UPDATE Issue by Id
  static async updateIssueById(req, res) {
    try {
      const issueID = req.params.id;
			console.log(issueID);
      const { title, summary, author_name, image, likes, comments, description, tag_id, forum_id } = req.body;

      const updateIssue = {
        title: title,
		summary: summary,
		author_name: author_name,
        image: image,
		likes: likes,
		comments: comments,
        description: description,
		createdAt: new Date(),
		updatedAt: new Date(),
        tag_id: tag_id,
		forum_id: forum_id
      };

      const dataIssue = await ISSUE_MODEL.findOne({
        where: {
          id: Number(issueID),
        },
      });

      if (dataIssue) {
        await ISSUE_MODEL.update(updateIssue, {
          where: {
            id: Number(issueID),
          },
        });
        res.status(200).send({
          message: `Data Issue Id ${issueID} was Updated Successfully`,
          updatedIssue: updateIssue,
        });
      } else {
        res.status(404).send({
          message: `Data Issue Id ${issueID} Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

	// DELETE Issue by Id
  static async deleteIssueById(req, res) {
    try {
      const issueID = req.params.id;

      const dataIssue = await ISSUE_MODEL.findOne({
        where: {
          id: Number(issueID),
        },
      });

      if (dataIssue) {
        await ISSUE_MODEL.destroy({
          where: {
            id: Number(issueID),
          },
        });
        res.status(200).send({
          message: `Data Issue Id ${issueID} was Deleted Successfully`,
          deletedIssue: dataIssue,
        });
      } else {
        res.status(404).send({
          message: `Data Issue Id ${issueID} Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

   // GET All Issue by Forum Id
   static async getIssuebyForumId(req, res) {
    try {
      const forum = req.params.forum

      const dataIssue = await ISSUE_MODEL.findAll({forum : forum})

      if (dataIssue) {
        res.status(200).send({
          message: `Success Get Issue`,
          issues: dataIssue,
        });
      } else {
        res.status(404).send({
          message: `Data Issue Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // GET All Issue by Query
  static async getIssuebyQuery(req, res) {
    try {
      const params = req.query;
      const dataIssue = await ISSUE_MODEL.findAll(params);

      res.status(200).send({
        message: "Success Get Data Issue by Params",
        issue: dataIssue,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }
}

module.exports = IssueController;