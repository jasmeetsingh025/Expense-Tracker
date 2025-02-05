import { body, param } from "express-validator";

/**
 *
 * @param {string} idName
 * @description Validate MongoDB IDs passed in the url's path variables
 */
export const mongoIdPathvariablesValidator = (idName) => {
  return [
    param(idName)
      .notEmpty()
      .isMongoId()
      .withMessage(`Invalid ${idName} provided`),
  ];
};
