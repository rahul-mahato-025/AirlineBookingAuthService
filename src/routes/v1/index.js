const express = require("express");
const UserController = require("../../controllers/user-controller");
const { validateAuthRequest } = require("../../middlewares/user-middleware");

const router = express.Router();

router.post("/signup", validateAuthRequest, UserController.signup);
router.post("/signin", validateAuthRequest, UserController.signin);

module.exports = router;
