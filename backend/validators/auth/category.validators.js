import { body } from "express-validator";

const createCategoryValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Category name is required")
      .isLength({ min: 3 })
      .withMessage("Category name must be at least 3 characters long"),
    body("type")
      .trim()
      .notEmpty()
      .withMessage("Category type is required")
      .isIn(["income", "expense"])
      .withMessage("Category type must be either income or expense"),
  ];
};

export { createCategoryValidator };
