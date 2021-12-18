const express = require("express");

const router = express.Router();

router.get("/ping", (req, res) => {
  res.status(200).send({
    message: "Success! Server is Ready",
  });
});

module.exports = router;
