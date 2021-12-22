// Import Modules
const express = require("express");
const router = express.Router();

// Router
const userRoutes = require("./user");
const authRoutes = require("./auth");
const forumRoutes = require("./forum");
const tagRoutes = require("./tag");
const messageRoutes = require("./message");

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

// Path Auth
router.use("/auth", authRoutes);
// Path User
router.use("/users", userRoutes);
// Path Forums
router.use("/forums", forumRoutes);
// Path Tags
router.use("/tags", tagRoutes);
// Path Messages
router.use("/messages", messageRoutes);

module.exports = router;
