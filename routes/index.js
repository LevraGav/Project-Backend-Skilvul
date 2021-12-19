// Import Modules
const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const { User, Role } = require("../models");
const roleChecker = require("../middleware/roles-mid");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

// Check ping
router.get("/ping", (req, res) => {
  res.status(200).send({
    message: "Success! Server is Ready",
  });
});

// Welcome Page
router.get("/", (req, res) => {
  res.send(`<h1>Hello Welcome to Greecotopia API!</h1>`);
});

// Register
router.post("/signup", roleChecker, async (req, res) => {
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

    await User.create(newUser);

    res.status(201).send({
      message: "Success Register Account",
      newUser: newUser,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message || "Internal Server Error",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
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
            roleName: Role?.name,
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
});

// Path Users
router.use("/users", userRoutes);

module.exports = router;
