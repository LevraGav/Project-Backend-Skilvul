const { User, Role } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class AuthController {
  // Register
  static async Register(req, res) {
    try {
      const hash = hashPassword(req.body.password);
      const { fullname, email, username, avatar, roleId } = req.body;

      const newUser = {
        fullname: fullname,
        email: email,
        username: username,
        password: hash,
        avatar: avatar,
        roleId: roleId,
        createdAt: new Date(),
      };
      if (!fullname || !email || !username || !password || !roleId) {
        res.status(400).send({
          error: "Field can't be empty",
        });
      } else {
        await User.create(newUser);

        res.status(201).send({
          message: "Success Register Account",
          newUser: newUser,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // Login
  static async Login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send({
        message: "Username and Password can't be empty",
      });
    } else {
      await User.findOne({
        where: {
          username,
        },
        include: {
          model: Role,
        },
      })
        .then((data) => {
          const { id, email, username, roleId } = data;
          const checkPw = comparePassword(password, data.password);
          if (checkPw) {
            const payload = {
              id,
              email,
              username,
              roleId,
              roleName: Role?.name || null,
            };
            const accessToken = generateToken(payload);
            res.status(200).send({
              message: "Login Success!",
              token: accessToken,
            });
          } else {
            res.status(401).send({
              message: "Invalid Username or Password!",
            });
          }
        })
        .catch((error) => {
          res.status(500).send({
            error: error.message || "Internal Server Error",
          });
        });
    }
  }
}

module.exports = AuthController;
