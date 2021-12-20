const rolesChecker = (req, res, next) => {
  const allowedRoles = [1, 2];
  const { role_id } = req.body;
  if (!allowedRoles.includes(role_id)) {
    res.status(400).send({
      error: "Roles must be 1 (admin) or 2 (member)",
    });
    return;
  } else {
    next();
  }
};

module.exports = rolesChecker;
