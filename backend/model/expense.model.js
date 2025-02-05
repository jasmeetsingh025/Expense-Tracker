import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const { Schema } = mongoose;

const ExpenseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
    paymentMethod: { type: String },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

ExpenseSchema.plugin(mongooseAggregatePaginate);

// Pre-save hook to update the updatedAt field
ExpenseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Expense", ExpenseSchema);
