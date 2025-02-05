import mongoose from "mongoose";

const { Schema } = mongoose;

const RecurringExpenseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    paymentMethod: { type: String },
    startDate: { type: Date, required: true },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },
  },
  { timestamps: true }
);

RecurringExpenseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("RecurringExpense", RecurringExpenseSchema);
