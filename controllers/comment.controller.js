const COMMENT_MODEL = require("../models").Comment;

class CommentController {
  // POST New Comment
	static postNewComment(req, res) {
    try{
      const { context, user_id, issue_id } = req.body

      const newComment = {
        context: context,
        createdAt: new Date(),
        updatedAt: new Date(),
        rep_comments: null,
        user_id: user_id,
        issue_id: issue_id
      }
      COMMENT_MODEL.create(newComment)
        .then(result => {
        res.status(200).json({ 
          message: 'Success post new Comment!', 
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

  //POST New reply comment
  static async postNewRepComment(req, res){
    try{
      const comments = await COMMENT_MODEL.findOne({ 
        where: { 
          comment_id: req.params.id 
        }
      })

      const rep_comments = comments.rep_comments

      const newRepComment = {
        uuid: generate(uuidv4), // https://www.npmjs.com/package/uuid
        context: req.body.context,
        author: req.body.author,
        depends_on: {
          author: req.body.depends_on.author,
          // uuid: req.body.depends_on.uuid
        }
      }

      const new_rep_comment = [ ...rep_comments, newRepComment]
      await Comment.update({
        rep_comments: new_rep_comment
      }, {
        where: {
          comment_id: req.params.id
        }
      })
    } catch(error){
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // GET All Comment
  static async getAllComments(req, res) {
    try {
      const dataComment = await COMMENT_MODEL.findAll();

      if (dataComment.length != 0) {
        res.status(200).send({
          message: "Success Get All Comments",
          comments: dataComment,
        });
      } else {
        res.status(404).send({
          message: "Data Comments is Empty",
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

	// GET Comment by Id
  static async getCommentById(req, res) {
    try {
      const commentID = req.params.id;

      const dataComment = await COMMENT_MODEL.findOne({
        where: {
          comment_id: Number(commentID),
        },
      });

      if (dataComment) {
        res.status(200).send({
          message: `Success Get Comment Id ${commentID}`,
          comments: dataComment,
        });
      } else {
        res.status(404).send({
          message: `Data Comment Id ${commentID} Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }
}

module.exports = CommentController;