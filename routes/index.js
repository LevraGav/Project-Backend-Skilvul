// Import Modules
const express = require("express");
const userRoutes = require("./user");

const router = express.Router();

// Check ping
router.get("/ping", (req, res) => {
  res.status(200).send({
    message: "Success! Server is Ready",
  });
});

// Welcome Page
router.get("/", (req, res) => {
  res.send(`<h1>Welcome to Greecotopia!</h1>`);
});

// Path Users
router.use("/users", userRoutes);

module.exports = router;
