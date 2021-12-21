const USER_MODEL = require("../models").User;
const { hashPassword } = require("../helpers/bcrypt");

class UserController {
  // GET All User
  static async getAllUser(req, res) {
    try {
      const dataUser = await USER_MODEL.findAll();

      if (dataUser.length != 0) {
        res.status(200).send({
          message: "Success Get All Users",
          users: dataUser,
        });
      } else {
        res.status(404).send({
          message: "Data Users is Empty",
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // GET User by Id
  static async getUserbyId(req, res) {
    try {
      const userID = req.params.id;
      const account = req.userAccount;

      const dataUser = await USER_MODEL.findOne({
        where: {
          user_id: Number(userID),
        },
      });
      if (dataUser) {
        res.status(200).send({
          status: `${account?.roleName}`,
          message: `Success Get User Id ${userID}`,
          users: dataUser,
        });
      } else {
        res.status(404).send({
          message: `Data User Id ${userID} Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // UPDATE User by Id
  static async updateUserById(req, res) {
    try {
      const userID = req.params.id;
      const account = req.userAccount;

      const password = req.body.password;
      if (password) {
        req.body.password = hashPassword(password);
      }

      const dataUser = await USER_MODEL.findOne({
        where: {
          user_id: Number(userID),
        },
      });

      const { email, username } = req.body;
      const dataEmail = await USER_MODEL.findOne({
        where: {
          email,
        },
      });

      const dataUsername = await USER_MODEL.findOne({
        where: {
          username,
        },
      });

      if (dataUser) {
        if (email === dataEmail || username === dataUsername) {
          res.status(400).send({
            message: "Email or Username already exists",
          });
        } else {
          await USER_MODEL.update(req.body, {
            where: {
              user_id: Number(userID),
            },
          });
          res.status(200).send({
            status: `${account?.roleName}`,
            message: `Data User Id ${userID} was Updated Successfully`,
            updatedUser: req.body,
          });
        }
      } else {
        res.status(404).send({
          message: `Data User Id ${userID} Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // DELETE User by Id
  static async deleteUserById(req, res) {
    try {
      const userID = req.params.id;

      const dataUser = await USER_MODEL.findOne({
        where: {
          user_id: Number(userID),
        },
      });

      if (dataUser) {
        await USER_MODEL.destroy({
          where: {
            user_id: Number(userID),
          },
        });
        res.status(200).send({
          message: `Data User Id ${userID} was Deleted Successfully`,
          deletedUser: dataUser,
        });
      } else {
        res.status(404).send({
          message: `Data User Id ${userID} Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }
}

module.exports = UserController;
