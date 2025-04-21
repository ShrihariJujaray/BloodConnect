const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be positive"],
    },
    status: {
      type: String,
      enum: ["pending", "scheduled", "completed", "cancelled"],
      default: "pending",
    },
    urgency: {
      type: String,
      enum: ["urgent", "moderate", "normal"],
      default: "normal",
    },
    description: String,
    scheduledDonor: {
      donor: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      scheduledDate: Date,
      scheduledTime: String,
      contactNumber: String,
      alternateNumber: String,
      preferredContactTime: String,
      additionalNotes: String,
      status: {
        type: String,
        enum: ["scheduled", "completed", "cancelled"],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
