const { User, Role } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class AuthController {
  // Register
  static async Register(req, res) {
    try {
      const { fullname, email, username, avatar, role_id } = req.body;
      const password = req.body.password;

      if (!fullname || !email || !username || !role_id) {
        res.status(400).send({
          error: "Field can't be empty",
        });
      } else {
        if (password) {
          req.body.password = hashPassword(password);
          await User.create(req.body);

          res.status(201).send({
            message: "Success Register Account",
            newUser: req.body,
          });
        } else {
          res.status(401).send({
            message: "Password can't be empty",
          });
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
      // .then((data) => {
      //   const { id, email, username, role_id } = data;
      //   const checkPw = comparePassword(password, data.password);
      //   if (checkPw) {
      //     const payload = {
      //       id,
      //       email,
      //       username,
      //       role_id,
      //       roleName: Role?.name || null,
      //     };
      //     const accessToken = generateToken(payload);
      //     res.status(200).send({
      //       message: "Login Success!",
      //       token: accessToken,
      //     });
      //   } else {
      //     res.status(401).send({
      //       message: "Invalid Username or Password!",
      //     });
      //   }
      // })
      // .catch((error) => {
      //   res.status(500).send({
      //     error: error.message || "Internal Server Error",
      //   });
      // });
    }
  }
}

module.exports = AuthController;