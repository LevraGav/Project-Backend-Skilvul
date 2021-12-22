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
}

module.exports = FavoriteIssuesController;