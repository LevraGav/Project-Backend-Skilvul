const { User, Role } = require("../models");
const { Op } = require("sequelize");

const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class AuthController {
  // Register
  static async Register(req, res, next) {
    try {
      const { fullname, email, username, password, avatar } = req.body;

      // Data kosong?
      if (!fullname || !email || !username || !password) {
        res.status(400).send({
          error: "'fullname', 'email', 'username', 'password' can't be empty",
        });
      } else {
        const dataUsers = await User.findOne({
          where: {
            [Op.or]: {
              email,
              username,
            },
          },
        });
        // Check allowed username and email
        if (dataUsers) {
          next({
            code: 400,
            message: "Email or Username already exists",
          });
          return;
        } else {
          const newUser = await User.create({
            fullname,
            email,
            username,
            password,
            avatar,
          });

          res.status(201).send({
            message: "Success Register Account",
            newUser: {
              user_id: newUser.user_id,
              fullname,
              username,
              email,
            },
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // Login
  static async Login(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
      next({
        code: 400,
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
          const { user_id, email, username, avatar, role_id, Role } = dataUser;
          const token = {
            user_id,
            email,
            username,
            avatar,
            role_id,
            roleName: Role?.name || null,
          };

          const accessToken = generateToken(token);
          res.status(200).send({
            message: "Login Success!",
            token: accessToken,
          });
        } else {
          next({
            code: 401,
            message: "Invalid Username or Password!",
          });
        }
      } else {
        next({
          code: 401,
          message: "Invalid Username or Password!",
        });
      }
    }
  }
}

module.exports = AuthController;
