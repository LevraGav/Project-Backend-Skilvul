const avatarChecker = (req, res, next) => {
  const allowedAvatars = ["img1", "img2", "img3"];
  const { avatar } = req.body;
  if (!allowedAvatars.includes(avatar)) {
    res.status(400).send({
      error: "You can only select avatar 'img1', 'img2', 'img3'",
    });
    return;
  } else {
    next();
  }
};

module.exports = avatarChecker;
