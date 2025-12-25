//user schema

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
