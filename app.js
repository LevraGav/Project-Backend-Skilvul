// Dotenv
const dotenv = require("dotenv");

// Import Module
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const routes = require("./routes");

const port = process.env.PORT || 3000;

async function main() {
  try {
    const app = express();

    // Middleware
    dotenv.config();
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(express.json());
    app.use(routes);
    app.use(bodyParser.json());

    // Running Server
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    res.status(500).send({
      error: error.message || "Internal Server Error",
    });
  }
}

main();
