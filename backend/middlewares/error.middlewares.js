import mongoose from "mongoose";

import Logger from "../logger/winston.logger.js";
import { ApiError } from "../utils/ApiErrors.js";

/**
 *
 * @param {Error | ApiError} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 *
 * @description Global error handler middleware is responsible for catching all errors that are thrown in the application.
 */
const errorHandler = (err, req, res, next) => {
  let error = err;
  console.log("Error Handler Middleware", err);

  //* Check if the error is an instance of ApiError class which is a custom error class
  if (!(error instanceof ApiError)) {
    //* If the error is not an instance of ApiError class, then create a new instance of ApiError class

    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    //* set a message from the native Error instance or a custom one.
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error?.errors || [], error.stack);
  }

  //* Now we are sure that the error is an instance of ApiError class
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  //* Log the error
  if (process.env.NODE_ENV === "development") {
    console.error(
      `${error.statusCode} - ${error.message} - ${req.originalUrl} - ${req.method}`
    );
  }
  Logger.error(
    `${error.statusCode} - ${error.message} - ${req.originalUrl} - ${req.method}`
  );

  return res.status(error.statusCode).send(response);
};

export { errorHandler };
