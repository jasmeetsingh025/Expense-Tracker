import User from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UserEnumRole } from "../constants.js";
import { forgotPasswordMailgenContent, sendEmail } from "../utils/mail.js";
import crypto from "crypto";

// Get all users
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({ deleted: false });
  if (!users || users.length === 0) {
    return next(new ApiError(404, "No user Found", []));
  }
  res
    .status(200)
    .json(new ApiResponse(200, { users }, "Users fetched successfully"));
});

// Get user by ID
export const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ApiError(404, `User with ID ${req.params.id} not found`, [])
    );
  }
  res.status(200).json(new ApiResponse(200, { user }, "User fetched"));
});

// Create new user
export const registerUser = asyncHandler(async (req, res, next) => {
  const { email, username, password, role } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return next(
      new ApiError(400, "User with that email or username already exists", [])
    );
  }
  const user = await User.create({
    email,
    username,
    password,
    role: role || UserEnumRole.USER,
  });
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    return next(new ApiError(400, "Bad Request Error creating user", []));
  }
  return res
    .status(201)
    .json(
      new ApiResponse(201, { user: createdUser }, "User created successfully")
    );
});

// Update user
export const updateUser = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedUser) {
    return next(
      new ApiError(404, `User with ID ${req.params.id} not found`, [])
    );
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, { user: updatedUser }, "User updated successfully")
    );
});

// Soft delete user
export const softDeleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(
      new ApiError(404, `User with ID ${req.params.id} not found`, [])
    );
  }
  user.deleted = true;
  await user.save();
  res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
});

// Delete user
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(new ApiError(404, "User not found", []));
  res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
});

// Login user
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;
  if (!email || !password) {
    return next(new ApiError(400, "Email and Password are required", []));
  }
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    return next(new ApiError(404, "User not found", []));
  }
  const isPasswordCorrect = await user.isPassworsCorrect(password);
  if (!isPasswordCorrect) {
    next(new ApiError(401, "Invalid credentials", []));
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Invalid credentials"));
  }
  //* Get the user document without the password field
  const loggedInUser = await User.findById(user._id).select(
    "-password -accessToken -_id -__v -updatedAt -createdAt"
  );

  const options = {
    httpOnly: true, // The cookie only accessible by the web server
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
  };
  const token = await user.generateAccessToken();
  user.accessToken = token;
  await user.save({ validateBeforeSave: false });

  req.user = {
    _id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
  return res
    .status(200)
    .cookie("accessToken", token, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, token },
        "User logged in successfully"
      )
    );
});

// Logout user
export const logoutUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { accessToken: "" } },
    { new: true }
  );
  const options = {
    // maxAge: 0,
    httpOnly: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Forgot password request for email
export const forgotPasswordRequest = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ApiError(400, "Email is required", []));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError(404, "User not found", []));
  }
  //* Generate a temporary token for password reset
  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryResetToken();

  //* Save the token and expiry date to the user document
  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  //* Send the forgot password reset link. It should be the link of the frontend URl with token
  await sendEmail({
    email: user?.email,
    subject: "Password reset token",
    mailgenContent: forgotPasswordMailgenContent(
      user?.username,
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unhashedToken}`
    ),
  });
  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, "Reset password link sent to you email address")
    );
});

// Reset forgot password
export const resetForgotPassword = asyncHandler(async (req, res, next) => {
  const { resetToken } = req.params;
  const { password, confirmPassword } = req.body;
  if (!resetToken || !password || !confirmPassword) {
    return next(
      new ApiError(400, "Token, Password and Confirm Password are required", [])
    );
  }
  if (password !== confirmPassword) {
    return next(new ApiError(400, "Passwords do not match", []));
  }
  //* Hash the token to compare with the one in the db
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gte: Date.now() },
  });

  //* If either of the one token or expiry date is invalid return an error
  if (!user) {
    return next(new ApiError(400, "Invalid or expired token", []));
  }
  //* if everything is ok and token id valid
  //* reset the forgot password token and expiry
  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});

// Change current password
export const changeCurrentPassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return next(
      new ApiError(400, "Old Password and New Password are required", [])
    );
  }
  const user = await User.findById(req.user?.id);
  if (!user) {
    return next(new ApiError(404, "User not found", []));
  }
  const isPasswordCorrect = await user.isPassworsCorrect(oldPassword);
  if (!isPasswordCorrect) {
    return next(new ApiError(401, "Invalid credentials", []));
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});
