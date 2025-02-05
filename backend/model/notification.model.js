import mongoose from "mongoose";

const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    type: {
      type: String,
      enum: ["budgetAlert", "recurringExpenseAlert"],
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

NotificationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Notification", NotificationSchema);
