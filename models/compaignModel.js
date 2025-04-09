const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const campaignSchema = new mongoose.Schema(
    {
        campaignAdmin:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "campaignAdmin is required"],
        },
        title: {
            type: String,
            required: [true, "title is require"],
        },
        description: {
            type: String,
            required: [true, "description is require"],
        },
        image: {
            type: String,
            required: [true, "image is require"],
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
                enum: ["admin", "hospital", "organization"],
                required: true
            },
            refId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            }
        },
        volunteerContacts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Volunteer",
            required: [true, "Volunteer contact is required"]
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
