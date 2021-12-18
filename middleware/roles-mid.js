const rolesChecker = (req, res, next) => {
  const allowedRoles = ["admin", "member"];
  const { role } = req.body;
  if (!allowedRoles.includes(role)) {
    res.status(400).send({
      error: "Roles must be admin or member",
    });
    return;
  }
  next();
};

module.exports = rolesChecker;
