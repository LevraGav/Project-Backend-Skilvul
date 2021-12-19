const USER_MODEL = require("../models").User;

class UserController {
  // CREATE New User
  static async createNewUser(req, res) {
    try {
      const { fullname, email, username, password, avatar, role } = req.body;

      const newUser = {
        fullname: fullname,
        email: email,
        username: username,
        password: password,
        avatar: avatar,
        role: role,
        createdAt: new Date(),
      };

      await USER_MODEL.create(newUser);

      res.status(201).send({
        message: "Success Create One User",
        newUser: newUser,
      });
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // GET All User
  static async getAllUser(req, res) {
    try {
      const userList = await USER_MODEL.findAll();

      if (userList.length != 0) {
        res.status(200).send({
          message: "Success Get All Users",
          users: userList,
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

      const dataUser = await USER_MODEL.findOne({
        where: {
          id: Number(userID),
        },
      });

      if (dataUser) {
        res.status(200).send({
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
      const { fullname, email, username, password, avatar, role } = req.body;

      const updateUser = {
        fullname: fullname,
        email: email,
        username: username,
        password: password,
        avatar: avatar,
        role: role,
        updatedAt: new Date(),
      };

      const dataUser = await USER_MODEL.findOne({
        where: {
          id: Number(userID),
        },
      });

      if (dataUser) {
        await USER_MODEL.update(updateUser, {
          where: {
            id: Number(userID),
          },
        });
        res.status(200).send({
          message: `Data User Id ${userID} was Updated Successfully`,
          updateUser: dataUser,
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

  // DELETE User by Id
  static async deleteUserById(req, res) {
    try {
      const userID = req.params.id;

      const dataUser = await USER_MODEL.findOne({
        where: {
          id: Number(userID),
        },
      });

      if (dataUser) {
        await USER_MODEL.destroy({
          where: {
            id: Number(userID),
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
