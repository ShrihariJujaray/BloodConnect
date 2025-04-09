const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is require"],
        },
        email: {
            type: String,
            required: [true, "email is require"],
        },
        phone: {
            type: String,
            required: [true, "phone is require"],
        },
        organisation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "organisation is require"],
        },
        skills: [String],
        documents: {
            idProof: String,            // File URL or reference
            certification: String       // Optional
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'pending'],
            default: 'pending'
        },
        availability: {
            available: Boolean,
            availableDays: [String],
            availableHours: {
                start: String,
                end: String
            }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);
