import { validationResult } from "express-validator";
import { errorHandler } from "../middlewares/error.middlewares.js";
import { ApiError } from "../utils/ApiErrors.js";
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 *
 * @description This is the validate middleware responsible to centralize the error checking done by the `express-validator` `ValidationChains`.
 * This middleware is responsible for validating the request body, query, and params.
 * If yes then it structures them and throws an {@link ApiError} which forwards the error to the {@link errorHandler} middleware which throws a uniform response at a single place
 */

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorStack = [];
    errors.array().map((error) => errorStack.push({ [error.path]: error.msg }));
    //! 422: Unprocessable Entity
    throw new ApiError(
      422,
      "Validation Error, Received data is not valid",
      errorStack
    );
  }
  next();
};

export { validate };
