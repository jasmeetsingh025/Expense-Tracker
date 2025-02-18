import { Router } from "express";

import {
  registerUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  softDeleteUser,
  loginUser,
  logoutUser,
  forgotPasswordRequest,
  resetForgotPassword,
  changeCurrentPassword,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  createUserValidator,
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userResetPasswordValidator,
} from "../validators/auth/user.validators.js";
import { validate } from "../validators/validate.js";

const router = Router();

router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/register").post(createUserValidator(), validate, registerUser);
router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:userId/soft-delete").put(softDeleteUser);
router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router
  .route("/reset-password/:resetToken")
  .post(userResetPasswordValidator(), validate, resetForgotPassword);
router
  .route("/change-password")
  .put(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword
  );
export default router;
