const FAVORITEISSUES_MODEL = require("../models").Favorite_Issue;

class FavoriteIssuesController {
  // POST New Favorite Issues
	static postNewFavoriteIssues(req, res) {
    try{
      const newFavoriteIssues = {
        user_id: req.userAccount.user_id,
        issue_id: req.body.issue_id
      }
      FAVORITEISSUES_MODEL.create(newFavoriteIssues)
        .then(result => {
        res.status(200).json({ 
            message: 'Success post new favorite issues!', 
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

  // GET All Favorite Issues
  static async getAllFavoriteIssues(req, res) {
    try {
      const dataFavoriteIssues = await FAVORITEISSUES_MODEL.findAll();

      if (dataFavoriteIssues.length != 0) {
        res.status(200).send({
          message: "Success Get All Favorite Issues",
          favoriteissues: dataFavoriteIssues,
        });
      } else {
        res.status(404).send({
          message: "Data Favorite Issues is Empty",
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // GET All Favorite Issue by User Id
  static async getFavoriteIssuesByUserId(req, res) {
    try {
      const user = req.params.user

      const dataFavIssues = await FAVORITEISSUES_MODEL.findAll({user : user})

      if (dataFavIssues) {
        res.status(200).send({
          message: `Success Get Your Favorite Issues`,
          favoriteIssues: dataFavIssues,
        });
      } else {
        res.status(404).send({
          message: `Data Favorite Issue Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // DELETE Favorite Issue by Id
  static async deleteFavoriteIssueById(req, res) {
    try {
      const issueID = req.params.id;
      const userID = req.userAccount.user_id
     
      const dataFavIssues = await FAVORITEISSUES_MODEL.findOne({
        where: {
          issue_id: Number(issueID),
        },
      });

      if (dataFavIssues) {
        const favIssueUser = await FAVORITEISSUES_MODEL.destroy({
          where: {
            issue_id: Number(issueID),
            user_id: Number(userID),
          },
        });
        if(favIssueUser){
          res.status(200).send({
            message: `Data Favorite Issue where Issue Id is ${issueID} was Deleted Successfully`,
            deletedFavoriteIssue: dataFavIssues,
          });
        } else{
          res.status(404).send({
            message: `Cannot delete Issue from Favorite because this Favorite Issue is not yours`,
          });
        }
      } else {
        res.status(404).send({
          message: `Data Favorite Issue where Issue Id is ${issueID} Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }
}

module.exports = FavoriteIssuesController;