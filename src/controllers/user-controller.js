const UserService = require("../services/user-service");

const userService = new UserService();

const signup = async (req, res) => {
  try {
    const user = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: user,
      success: true,
      message: "User created Successfully",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Unable to register the user",
      error: error,
    });
  }
};

const signin = async (req, res) => {
  try {
    const response = await userService.signin({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(200).json({
      data: response,
      success: true,
      message: "Signed in successfully",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Unable to sign in",
      error: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    console.log(req.params.id);
    const response = await userService.destroy(req.params.id);
    return res.status(200).json({
      data: response,
      success: true,
      message: "User deleted Successfully",
      error: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "Unable to delete the user",
      error: error,
    });
  }
};

module.exports = {
  signup,
  signin,
  destroy,
};
