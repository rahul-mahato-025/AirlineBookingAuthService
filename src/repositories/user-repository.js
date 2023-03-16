const { User, Role } = require("../models");
const { ValidationError } = require("../utils/errors/index");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the user repository");
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong in the user repository");
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong in the user repository");
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong in the user repository");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong in the user repository");
      throw error;
    }
  }
}

module.exports = UserRepository;
