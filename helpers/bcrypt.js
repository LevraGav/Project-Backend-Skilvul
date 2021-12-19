const bcrypt = require("bcryptjs");

const hashPassword = (plainPw) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(plainPw, salt);

  return hash;
};

const comparePassword = (plainPw, hashPw) => {
  return bcrypt.compareSync(plainPw, hashPw);
};

module.exports = {
  hashPassword,
  comparePassword,
};
