const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
  constructor(name, message, description, statusCode) {
    super();
    this.name = name || "AppError";
    this.message = message || "Something went wrong";
    this.description = description || "Something went wrong";
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = AppError;
