const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  return jwt.sign(data, "GR33C0TOP14");
};

const verifyToken = (token) => {
  return jwt.verify(token, "GR33C0TOP14");
};

module.exports = { generateToken, verifyToken };
