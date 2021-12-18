const rolesChecker = (req, res, next) => {
  const allowedRoles = ["admin", "member"];
  const { roles } = req.body;
  if (!allowedRoles.includes(roles)) {
    res.status(400).send({
      error: "Roles must be admin or member",
    });
    return;
  }
  next();
};

module.exports = rolesChecker;
