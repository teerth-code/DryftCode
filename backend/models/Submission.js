const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        hackathon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hackathon",
            required: true
        },

        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true
        },

        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        projectName: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        githubLink: {
            type: String,
            required: true
        },

        demoLink: {
            type: String,
            default: ""
        },

        techStack: {
            type: [String],
            default: []
        },

        track: {
            type: String,
            required: true
        },

        submittedAt: {
            type: Date,
            default: Date.now
        },

        isWinner: {
            type: Boolean,
            default: false
        },

        winnerTrack: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Submission", submissionSchema);