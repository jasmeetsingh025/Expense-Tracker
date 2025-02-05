import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { AvailableFrequencies } from "../constants.js";

const { Schema } = mongoose;

const BudgetSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    globalInitialLimit: { type: Number, default: 0 },
    globalCurrentLimit: { type: Number, default: 0 },
    categories: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        categoryName: {
          type: String,
          required: true,
        },
        initialLimit: { type: Number, required: true },
        currentLimit: { type: Number, required: true },
      },
    ],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    period: {
      type: String,
      enum: AvailableFrequencies,
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

BudgetSchema.plugin(mongooseAggregatePaginate);

BudgetSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Budget", BudgetSchema);
