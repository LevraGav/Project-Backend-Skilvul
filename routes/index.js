// Import Modules
const express = require("express");
const userRoutes = require("./user");
const USER_MODEL = require("../models").User;

const router = express.Router();

// Token Secret
const accessTokenSecret = "youraccesstokensecret";

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

// Path Users
router.use("/users", userRoutes);

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  await USER_MODEL.findOne({
    where: {
      username,
      password,
    },
  });
});
module.exports = router;
