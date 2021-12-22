const USER_MODEL = require("../models").User;
const { verifyToken } = require("../helpers/jwt");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      const { user_id, email, username } = decoded;
      USER_MODEL.findOne({
        where: {
          user_id,
          email,
          username,
        },
      })
        .then((data) => {
          if (data) {
            req.userAccount = decoded;
            next();
          } else {
            res.status(401).send({
              message: "Invalid Auth!",
            });
          }
        })
        .catch((error) => {
          res.status(400).send({ message: "Invalid Token" });
        });
    } else {
      res.status(401).send({
        message: "Invalid Auth!",
      });
    }
  } else {
    res.status(401).send({
      message: "Invalid Auth!",
    });
  }
};
