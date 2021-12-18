// Dotenv
const dotenv = require("dotenv");
dotenv.config();

// Import Module
const express = require("express");
const USER_MODEL = require("./models/user");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(routes);

// Running Server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
