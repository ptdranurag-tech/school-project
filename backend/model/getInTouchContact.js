import mongoose from "mongoose";

const getInTouchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [5, "Message should be at least 5 characters long"],
    },
  },
  { timestamps: true }
);

export const GetInTouch = mongoose.model("GetInTouch", getInTouchSchema);
