const { StatusCodes } = require("http-status-codes");
const AppError = require("./app-error");

class ValidationError extends AppError {
  constructor(error) {
    const errorName = error.name;
    const message = "Invalid request body";
    const statusCode = StatusCodes.BAD_REQUEST;
    let description = [];

    error.errors.forEach((err) => {
      description.push(err.message);
    });
    console.log("Validation Error -> ", error);
    super(errorName, message, description, statusCode);
  }
}

module.exports = ValidationError;
