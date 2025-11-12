import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "School Campus",
      trim: true,
    },
    organizer: {
      type: String,
      default: "Admin",
      trim: true,
    },
    category: {
      type: String,
      enum: ["Cultural", "Academic", "Sports", "Emergency", "Other"],
      default: "Other",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", EventSchema);
