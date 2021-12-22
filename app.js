// Dotenv
const dotenv = require("dotenv");

// Import Module
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
<<<<<<< HEAD
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT;
=======

const port = process.env.PORT || 3000;
>>>>>>> 6460800705b8e879439f00c87257f7a766ce5b65

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
<<<<<<< HEAD
    app.use(errorHandler);
=======
>>>>>>> 6460800705b8e879439f00c87257f7a766ce5b65

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

<<<<<<< HEAD
main();
=======
main();
>>>>>>> 6460800705b8e879439f00c87257f7a766ce5b65
