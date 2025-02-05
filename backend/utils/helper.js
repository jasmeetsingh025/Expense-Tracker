import mongoose from "mongoose";

export const toObjectId = (id) => {
  return new mongoose.Types.ObjectId(id);
};
