import { body, query } from "express-validator";

export const ReportsValidator = () => {
  return [query("period").trim().notEmpty().withMessage("Period is required")];
};
