const UserRepository = require("../repositories/user-repository");

class UserService {
  constructor() {
    this.uerRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.uerRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the user service");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const response = await this.uerRepository.destroy(userId);
      return response;
    } catch (error) {
      console.log("Something went wrong in the user service");
      throw error;
    }
  }
}

module.exports = UserService;
