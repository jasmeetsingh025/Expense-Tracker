import { errorHandler } from "../middlewares/error.middlewares.js";
/**
 * @description Custom error class to handle API errors with status code and message from any part of the application.
 * The {@link errorHandler} middleware will catch the error and send a response to the client.
 */
class ApiError extends Error {
  /**
   *
   * @param {number} statusCode - The status code of the error
   * @param {string} message - The message of the error
   * @param {any[]} errors - The error object
   * @param {string} stack - The stack trace of the error
   */
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
