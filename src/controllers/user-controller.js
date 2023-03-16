const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/user-service");

const userService = new UserService();

const signup = async (req, res) => {
  try {
    const user = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(StatusCodes.CREATED).json({
      data: user,
      success: true,
      message: "User created Successfully",
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      data: {},
      success: false,
      message: error.message,
      error: error.description,
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

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      data: response,
      success: true,
      message: "User is Authenticated",
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      data: {},
      success: false,
      message: "User is not authenticated",
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

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      data: response,
      success: true,
      message: "User info fetched sucessfully",
      error: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "Unable to fetch user info",
      error: error,
    });
  }
};

module.exports = {
  signup,
  signin,
  destroy,
  isAuthenticated,
  isAdmin,
};
