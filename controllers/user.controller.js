const { Op } = require("sequelize");
const USER_MODEL = require("../models").User;
const { hashPassword } = require("../helpers/bcrypt");

class UserController {
  // GET All User
  static async getAllUser(req, res, next) {
    try {
      const dataUser = await USER_MODEL.findAll({
        attributes: {
          exclude: ["password"],
        },
      });

      if (dataUser.length != 0) {
        res.status(200).send({
          message: "Success Get All Users",
          users: dataUser,
        });
      } else {
        next({
          code: 404,
          message: "Data Users is Empty",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // GET User by Id
  static async getUserbyId(req, res, next) {
    try {
      const userID = req.params.id;

      const dataUser = await USER_MODEL.findOne({
        where: {
          user_id: Number(userID),
        },

        attributes: {
          exclude: ["password"],
        },
      });
      if (dataUser) {
        res.status(200).send({
          message: `Success Get User Id ${userID}`,
          users: dataUser,
        });
      } else {
        next({
          code: 404,
          message: `Data User Id ${userID} Not Found`,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // UPDATE User by Id
  static async updateUserById(req, res, next) {
    try {
      const userID = req.params.id;

      const { email, username, password } = req.body;

      const filterQuery = {};
      if (username) {
        filterQuery.username = username;
      }
      if (email) {
        filterQuery.email = email;
      }

      const existingUser = await USER_MODEL.findOne({
        where: {
          [Op.or]: filterQuery,
        },
      });

      if (password) {
        const account = req.userAccount;
        if (Number(userID) !== Number(account?.user_id)) {
          res.status(400).send({
            error: "Access Denied! Password failed to change",
          });
        } else {
          const passPattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_/!@#$%^&*.])(?=.{8,})"
          );
          if (passPattern.test(password)) {
            req.body.password = hashPassword(password);
          } else {
            next({
              code: 400,
              message:
                "Password must have at least 8 characters consisting of uppercase and lowercase letters, numbers, symbols(!@#$_%^&*). Example: Gre3c0topi4!",
            });
          }
        }
      }

      const dataUser = await USER_MODEL.findOne({
        where: {
          user_id: Number(userID),
        },
      });

      if (dataUser) {
        if (existingUser && Number(userID) !== Number(existingUser.user_id)) {
          next({
            code: 400,
            message: "Email or Username already exists",
          });
        } else {
          await USER_MODEL.update(req.body, {
            where: {
              user_id: Number(userID),
            },
          });
          res.status(200).send({
            message: `Data User Id ${userID} was Updated Successfully`,
            updatedData: req.body,
          });
        }
      } else {
        next({
          code: 404,
          message: `Data User Id ${userID} Not Found`,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE User by Id
  static async deleteUserById(req, res, next) {
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
        next({
          code: 404,
          message: `Data User Id ${userID} Not Found`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
