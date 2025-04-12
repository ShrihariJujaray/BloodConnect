const mongoose = require("mongoose");
const { volunteerSchema } = require("./volunteerMOdel");

const campaignSchema = new mongoose.Schema(
  {
    campaignAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "campaignAdmin is required"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    date: Date,
    location: {
      address: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    createdBy: {
      role: {
        type: String,
        enum: ["admin", "hospital", "organisation"],
        required: true,
      },
      refId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
    // Embed volunteer details directly
    volunteerContacts:{
        type: [volunteerSchema],
        default: [],
        required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
