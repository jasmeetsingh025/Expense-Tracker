import mongoose, { Schema } from "mongoose";
import { AvailableFrequencies, FrequencyEnum } from "../constants.js";

const ReportSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: AvailableFrequencies,
      default: FrequencyEnum.MONTHLY,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalExpenses: {
      type: Number,
      required: true,
    },
    totalBudget: {
      type: Number,
      required: true,
    },
    categoryBreakdown: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        totalSpent: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentMethodBreakdown: [
      {
        paymentMethod: {
          type: String,
          required: true,
        },
        totalSpent: {
          type: Number,
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

ReportSchema.pre("save", async function (next) {
  this.updatedAt = Date.now();
  next();
});

const Report = mongoose.model("Report", ReportSchema);

export default Report;
