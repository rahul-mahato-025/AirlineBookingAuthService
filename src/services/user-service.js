const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user-repository");
const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the user service");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const response = await this.userRepository.destroy(userId);
      return response;
    } catch (error) {
      console.log("Something went wrong in the user service");
      throw error;
    }
  }

  async signin(data) {
    try {
      const user = await this.userRepository.getUserByEmail(data.email);
      const isCorrectPassword = this.comparePassword(
        data.password,
        user.password
      );
      if (!isCorrectPassword) {
        throw { error: "Incorrect Password" };
      }
      const token = this.generateToken(user);
      return token;
    } catch (error) {
      console.log("Something went wrong in the signin in user service");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);

      if (!response) {
        throw { error: "Invalid token" };
      }

      const user = await this.userRepository.getUserById(response.id);
      if (!user) {
        throw { error: "User no longer exists" };
      }

      return user.id;
    } catch (error) {
      console.log("Something went wrong in the isAuthenticated service");
      throw error;
    }
  }

  generateToken(user) {
    try {
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_KEY, {
        expiresIn: "1d",
      });
      return token;
    } catch (error) {
      console.log("Something went wrong in the while generating token");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const user = jwt.verify(token, JWT_KEY);
      return user;
    } catch (error) {
      console.log("Something went wrong in the while verifying token");
      throw error;
    }
  }

  comparePassword(userPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in the while comparing passwords");
      throw error;
    }
  }
}

module.exports = UserService;
