import userModel from "../model/user.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    return next(new ApiError(401, "Unauthorized requests", []));
  }

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decodeToken?.id).select("-password");
    if (!user) {
      return next(new ApiError(401, "Invalid Access Token", []));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(
      new ApiError(401, error?.message || "Unauthorized requests", [])
    );
  }
});

/**
 *
 * @param {AvailableUserRoles} roles
 * @description
 * * This middleware function checks if the user has the required roles to access the route
 */
const authorizeRoles = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user?.id) {
      return next(new ApiError(401, "Unauthorized requests", []));
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, "You are not allowed to perform this action", [])
      );
    }
    next();
  });
};
export { verifyJWT, authorizeRoles };
