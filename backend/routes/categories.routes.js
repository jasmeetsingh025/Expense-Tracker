import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controller/categories.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middlewares.js";
import { createCategoryValidator } from "../validators/auth/category.validators.js";
import { validate } from "../validators/validate.js";
import { UserEnumRole } from "../constants.js";
import { mongoIdPathvariablesValidator } from "../validators/auth/mongodb.validators.js";

const router = Router();

router
  .route("/")
  .post(verifyJWT, createCategoryValidator(), validate, createCategory)
  .get(getAllCategories);

router
  .route("/:categoryId")
  .get(mongoIdPathvariablesValidator("categoryId"), validate, getCategoryById)
  .delete(
    verifyJWT,
    authorizeRoles([UserEnumRole.ADMIN]),
    mongoIdPathvariablesValidator("categoryId"),
    validate,
    deleteCategory
  )
  .patch(
    verifyJWT,
    authorizeRoles([UserEnumRole.ADMIN]),
    mongoIdPathvariablesValidator("categoryId"),
    validate,
    updateCategory
  );

export default router;
