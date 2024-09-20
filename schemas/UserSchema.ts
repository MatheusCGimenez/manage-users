import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
