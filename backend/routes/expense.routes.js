import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  createExpenseValidator,
  createRecurringExpenseValidator,
} from "../validators/auth/expense.validators.js";
import { validate } from "../validators/validate.js";
import { authorizeRoles } from "../middlewares/auth.middlewares.js";
import { UserEnumRole } from "../constants.js";
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  createRecurringExpense,
  updateRecurringExpense,
  deleteRecurringExpense,
} from "../controller/expense.controller.js";
import { mongoIdPathvariablesValidator } from "../validators/auth/mongodb.validators.js";
const router = Router();

router
  .route("/")
  .get(verifyJWT, authorizeRoles([UserEnumRole.ADMIN]), getAllExpenses)
  .post(verifyJWT, createExpenseValidator(), validate, createExpense);
router
  .route("/:expenseId")
  .get(
    verifyJWT,
    mongoIdPathvariablesValidator("expenseId"),
    validate,
    getExpenseById
  )
  .put(
    verifyJWT,
    mongoIdPathvariablesValidator("expenseId"),
    createExpenseValidator(),
    validate,
    updateExpense
  )
  .delete(
    verifyJWT,
    mongoIdPathvariablesValidator("expenseId"),
    validate,
    deleteExpense
  );

//* Below routes are for the recurring expenses
router
  .route("/recurring-expenses/")
  .post(
    verifyJWT,
    createRecurringExpenseValidator(),
    validate,
    createRecurringExpense
  );
router
  .route("/recurring-expenses/:expenseId")
  .put(
    verifyJWT,
    mongoIdPathvariablesValidator("expenseId"),
    createRecurringExpenseValidator(),
    validate,
    updateRecurringExpense
  )
  .delete(
    verifyJWT,
    mongoIdPathvariablesValidator("expenseId"),
    validate,
    deleteRecurringExpense
  );
export default router;
