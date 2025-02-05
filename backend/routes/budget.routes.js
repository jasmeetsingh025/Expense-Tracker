import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { BudgetValidator } from "../validators/auth/budget.validators.js";
import { validate } from "../validators/validate.js";
import { authorizeRoles } from "../middlewares/auth.middlewares.js";
import { UserEnumRole } from "../constants.js";
import {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
  softDeleteBudget,
} from "../controller/budget.controller.js";

const router = Router();

router
  .route("/")
  .get(verifyJWT, getAllBudgets)
  .post(verifyJWT, BudgetValidator(), validate, createBudget);
router
  .route("/:budgetId")
  .get(verifyJWT, getBudgetById)
  .put(verifyJWT, BudgetValidator(), validate, updateBudget)
  .delete(verifyJWT, authorizeRoles([UserEnumRole.ADMIN]), deleteBudget);
router.route("/:budgetId/soft-delete").put(verifyJWT, softDeleteBudget);

export default router;
