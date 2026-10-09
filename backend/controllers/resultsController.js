const Submission = require("../models/Submission");

const getResults = async (req, res) => {
    try {
        const { hackathonId } = req.params;

        const winners = await Submission.find({
            hackathon: hackathonId,
            isWinner: true
        });

        res.status(200).json({
            message: "Results fetched successfully",
            winners
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getResults
};