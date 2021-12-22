module.exports = (req, res, next) => {
  const userID = req.params.id;
  const account = req.userAccount;

  if (
    Number(userID) !== Number(account?.user_id) &&
    account?.roleName !== "admin"
  ) {
    res.status(403).send({
      error: "Forbidden User",
    });
  } else {
    next();
  }
};
