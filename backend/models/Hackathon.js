const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        submissionDeadline: {
            type: Date,
            required: true
        },

        tracks: {
            type: [String],
            required: true
        },

        prizes: {
            type: [String],
            default: []
        },

        minTeamSize: {
            type: Number,
            required: true
        },

        maxTeamSize: {
            type: Number,
            required: true
        },

        eligibility: {
            type: String,
            required: true
        },

        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Hackathon", hackathonSchema);