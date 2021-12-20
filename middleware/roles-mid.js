const rolesChecker = (req, res, next) => {
  const allowedRoles = [1, 2];
  const { roleId } = req.body;
  if (!allowedRoles.includes(roleId)) {
    res.status(400).send({
      error: "Roles must be 1 (admin) or 2 (member)",
    });
    return;
  } else {
    next();
  }
};

module.exports = rolesChecker;
