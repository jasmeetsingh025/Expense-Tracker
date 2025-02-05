import { body } from "express-validator";
import { AvailableFrequencies } from "../../constants.js";

const BudgetValidator = () => {
  return [
    body("category")
      .trim()
      .notEmpty()
      .isLength({ min: 4 })
      .withMessage("Category name must be at least 4 characters long"),
    body("limit").trim().notEmpty().withMessage("Amount is Mandatory"),
    body("startDate").trim().notEmpty().withMessage("Start date is required"),
    body("endDate").trim().notEmpty().withMessage("End date is required"),
    body("period")
      .trim()
      .notEmpty()
      .withMessage("Period is required")
      .isIn(AvailableFrequencies)
      .withMessage(
        `Invalid period. Allowed values: ${AvailableFrequencies.join(", ")}`
      ),
  ];
};

export { BudgetValidator };
