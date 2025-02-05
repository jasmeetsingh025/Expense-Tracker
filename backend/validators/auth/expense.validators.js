import { body } from "express-validator";

const createExpenseValidator = () => {
  return [
    body("category")
      .trim()
      .notEmpty()
      .withMessage("Category name is required")
      .isLength({ min: 4 })
      .withMessage("Category name must be at least 4 character long"),
    body("amount").trim().notEmpty().withMessage("Amount is Mandatory"),
    body("paymentMethod")
      .trim()
      .notEmpty()
      .withMessage("Payment method is required"),
  ];
};

const updateExpenseValidator = () => {
  return [
    body("category")
      .optional()
      .trim()
      .isLength({ min: 4 })
      .withMessage("Category name must be at least 4 character long"),
    body("amount").optional(),
    body("paymentMethod")
      .trim()
      .notEmpty()
      .withMessage("Payment method is required"),
  ];
};

const createRecurringExpenseValidator = () => {
  return [
    body("category")
      .trim()
      .notEmpty()
      .withMessage("Category name is required")
      .isLength({ min: 4 })
      .withMessage("Category name must be at least 4 character long"),
    body("amount").trim().notEmpty().withMessage("Amount is Mandatory"),
    body("paymentMethod")
      .trim()
      .notEmpty()
      .withMessage("Payment method is required"),
    body("frequency")
      .trim()
      .notEmpty()
      .isIn(["daily", "weekly", "monthly", "yearly"])
      .withMessage("Recurring type is required"),
    body("startDate")
      .trim()
      .notEmpty()
      .withMessage("Recurring interval is required"),
  ];
};

export {
  createExpenseValidator,
  updateExpenseValidator,
  createRecurringExpenseValidator,
};
