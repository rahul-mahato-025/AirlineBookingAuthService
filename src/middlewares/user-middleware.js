const validateAuthRequest = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      data: {},
      success: false,
      message: "Something went wrong",
      error: "invalid request parameters",
    });
  }
  next();
};

module.exports = {
  validateAuthRequest,
};
