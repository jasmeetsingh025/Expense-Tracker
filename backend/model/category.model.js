import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, //# null means it is a system category/GLOBAL
    },
    icon: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

CategorySchema.plugin(mongooseAggregatePaginate);
/**
 ** This means:
 ** If userId is null, the category name must be unique across all global categories.
 ** If userId is set, the category name can be duplicated as long as it belongs to a different user.
 */
CategorySchema.index({ name: 1, userId: 1 }, { unique: true });

CategorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Category", CategorySchema);
