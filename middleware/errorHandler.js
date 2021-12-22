module.exports = (err, req, res, next) => {
  if (err.code && err.message) {
    res.status(err.code).json({
      error: err.message,
    });
  } else if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((error) => error.message);
    res.status(400).json({ errors });
  } else {
    res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};
