const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["STUDENT", "ORGANIZER", "ADMIN"],
            required: true
        },

        collegeName: {
            type: String,
            required: true
        },

        isEmailVerified: {
            type: Boolean,
            default: false
        },

        profilePicture: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            default: ""
        },

        skills: {
            type: [String],
            default: []
        },

        github: {
            type: String,
            default: ""
        },

        linkedin: {
            type: String,
            default: ""
        },

        clubName: {
            type: String,
            default: ""
        },

        clubDescription: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);