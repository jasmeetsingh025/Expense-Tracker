import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { AvailableUserRoles, UserEnumRole } from "../constants.js";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserEnumRole.USER,
      required: true,
      uppercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    accessToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Pre-save hook to update the updatedAt field
UserSchema.pre("save", async function (next) {
  try {
    this.updatedAt = Date.now();
    // Hash the password before saving the user model
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hashSync(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords for login
UserSchema.methods.isPassworsCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate a JWT token
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );
};

/**
 * @description Method responsible for generating token for password reset
 */
UserSchema.methods.generateTemporaryResetToken = function () {
  const unhashedToken = crypto.randomBytes(20).toString("hex");
  //? This should stay in the db to compare at the time of verification
  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");
  //? This is the expiry date for the token (20 minutes)
  const tokenExpiry = Date.now() + 20 * 60 * 1000;
  return { unhashedToken, hashedToken, tokenExpiry };
};

export default mongoose.model("User", UserSchema);
