const { User, Role } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const avatarChecker = require("../middleware/avatar-mid");

class AuthController {
  // Register
  static async Register(req, res, next) {
    try {
      const { fullname, email, username, avatar, role_id } = req.body;
      const password = req.body.password;

      const dataEmail = await User.findOne({
        where: {
          email,
        },
      });
      const dataUsername = await User.findOne({
        where: {
          username,
        },
      });
      // Data kosong?
      if (!fullname || !email || !username || !role_id) {
        res.status(400).send({
          error: "Field can't be empty",
        });
      } else {
        // Check allowed username and email
        if (dataEmail || dataUsername) {
          res.status(400).send({
            message: "Email or Username already exists",
          });
        } else {
          // Password Ada?
          if (password) {
            req.body.password = hashPassword(password);
            // Avatar Ada?
            if (avatar) {
              const allowedAvatar = await User.findOne({
                where: {
                  avatar: ["img1", "img2", "img3"],
                },
              });
              if (!allowedAvatar) {
                res.status(400).send({
                  error: "You can only select avatar 'img1', 'img2', 'img3'",
                });
              } else {
                await User.create(req.body);
                res.status(201).send({
                  message: "Success Register Account",
                  newUser: req.body,
                });
              }
            } else {
              await User.create(req.body);
              res.status(201).send({
                message: "Success Register Account",
                newUser: req.body,
              });
            }
          } else {
            res.status(400).send({
              message: "Password can't be empty",
            });
          }
        }
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
      const dataUser = await User.findOne({
        where: {
          username,
        },
        include: {
          model: Role,
        },
      });
      if (dataUser) {
        // jika data user ada
        const checkPw = comparePassword(password, dataUser.password);
        if (checkPw) {
          // jika password benar
          const { user_id, email, username, role_id, Role } = dataUser;
          const token = {
            user_id,
            email,
            username,
            role_id,
            roleName: Role?.name || null,
          };

          const accessToken = generateToken(token);
          res.status(200).send({
            message: "Login Success!",
            token: accessToken,
          });
        } else {
          res.status(401).send({
            message: "Invalid Username or Password!",
          });
        }
      } else {
        res.status(401).send({
          message: "Invalid Username or Password!",
        });
      }
    }
  }
}

module.exports = AuthController;
