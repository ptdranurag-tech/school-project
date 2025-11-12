import mongoose from "mongoose";

const EmergencyNoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    roles: {
      type: [String],
      enum: [
        "owner",
        "principal",
        "vicePrincipal",
        "management",
        "teacher",
        "student",
      ],
      required: true,
    },
    category: {
      type: String,
      enum: [
        // Owner
        "New Policy Announcement",
        "Financial Updates",
        "Important Circulars",
        "System Maintenance",

        // Principal
        "School Rules Update",
        "Exam Schedule",
        "Result Announcement",
        "Parent Meeting",

        // Vice Principal
        "Timetable Changes",
        "Staff Coordination Meeting",
        "Academic Calendar Update",

        // Management
        "Admission Notice",
        "Holiday Announcement",
        "Fee Reminder",
        "Infrastructure Update",

        // Teacher
        "Staff Meeting",
        "Exam Duties",
        "Class Substitution",
        "Training Workshop",

        // Student
        "Holiday Notice",
        "Result Declaration",
        "Uniform / Dress Code Update",
        "PTM Reminder",
      ],
      required: true,
    },
    expiryDate: { type: Date },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const EmergencyNotice = mongoose.model("EmergencyNotice", EmergencyNoticeSchema);
