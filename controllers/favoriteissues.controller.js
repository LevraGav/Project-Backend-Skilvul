const FAVORITEISSUES_MODEL = require("../models").Favorite_Issue;

class FavoriteIssuesController {
  // POST New Favorite Issues
  static postNewFavoriteIssues(req, res) {
    try {
      const newFavoriteIssues = {
        user_id: req.userAccount.user_id,
        issue_id: req.body.issue_id,
      };
      FAVORITEISSUES_MODEL.create(newFavoriteIssues)
        .then((result) => {
          res.status(200).json({
            message: "Success post new favorite issues!",
            result,
          });
        })
        .catch((err) => res.status(400).json({ message: err }));
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
      const user = req.params.id;

      const dataFavIssues = await FAVORITEISSUES_MODEL.findOne({
        where: {
          user_id: user,
        },
      });

      if (dataFavIssues) {
        if (Number(req.userAccount.user_id) === Number(user)) {
          res.status(200).send({
            message: "Success Get Your Favorite Issues",
            favoriteIssues: dataFavIssues,
          });
        } else {
          res.status(400).send({
            message: "Data Favorite Issue is Not Yours",
          });
        }
      } else {
        res.status(404).send({
          message: "Data Favorite Issue is Not Found",
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // DELETE Favorite Issue by User Id
  static async deleteFavoriteIssueByUserId(req, res) {
    try {
      const user = req.params.id;

      const dataFavIssues = await FAVORITEISSUES_MODEL.findAll({
        where: {
          user_id: user,
        },
      });

      if (dataFavIssues) {
        if (Number(req.userAccount.user_id) === Number(user)) {
          await FAVORITEISSUES_MODEL.destroy({
            where: {
              user_id: Number(user),
            },
          });
          res.status(200).send({
            message: "Success Delete Your Favorite Issues",
            favoriteIssues: dataFavIssues,
          });
        } else {
          res.status(400).send({
            message: "Data Favorite Issue is Not Yours",
          });
        }
      } else {
        res.status(404).send({
          message: "Data Favorite Issue is Not Found",
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // DELETE Favorite Issue by Issue Id
  static async deleteFavoriteIssueByIssueId(req, res) {
    try {
      const issue = req.params.issueId;
      const user = req.params.userId;

      const dataFavIssues = await FAVORITEISSUES_MODEL.findOne({
        where: {
          user_id: user,
          issue_id: issue,
        },
      });

      if (dataFavIssues) {
        if (Number(req.userAccount.user_id) === Number(user)) {
          await FAVORITEISSUES_MODEL.destroy({
            where: {
              issue_id: Number(issue),
              user_id: Number(user),
            },
          });
          res.status(200).send({
            message: "Success Delete Your Favorite Issues",
            favoriteIssues: dataFavIssues,
          });
        } else {
          res.status(400).send({
            message: "Data Favorite Issue is Not Yours",
          });
        }
      } else {
        res.status(404).send({
          message: "Data Favorite Issue is Not Found",
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
