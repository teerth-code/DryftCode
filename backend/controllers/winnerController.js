const Submission = require("../models/Submission");
const Hackathon = require("../models/Hackathon");

const markWinner = async (req, res) => {
    try {
        const { submissionId } = req.params;
        const { track } = req.body;

        const submission = await Submission.findById(submissionId);

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }

        const hackathon = await Hackathon.findById(submission.hackathon);

        if (!hackathon) {
            return res.status(404).json({
                message: "Hackathon not found"
            });
        }

        if (hackathon.organizer.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "Only the hackathon organizer can mark winners"
            });
        }

        if (!hackathon.tracks.includes(track)) {
            return res.status(400).json({
                message: "Invalid track"
            });
        }

        submission.isWinner = true;
        submission.winnerTrack = track;

        await submission.save();

        res.status(200).json({
            message: "Winner marked successfully",
            submission
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    markWinner
};