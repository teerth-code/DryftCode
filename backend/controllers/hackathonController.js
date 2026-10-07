const Hackathon = require("../models/Hackathon");

const createHackathon = async (req, res) => {
    try {
        const {
            name,
            description,
            startDate,
            endDate,
            submissionDeadline,
            tracks,
            prizes,
            minTeamSize,
            maxTeamSize,
            eligibility
        } = req.body;

        const hackathon = await Hackathon.create({
            name,
            description,
            startDate,
            endDate,
            submissionDeadline,
            tracks,
            prizes,
            minTeamSize,
            maxTeamSize,
            eligibility,
            organizer: req.user.id
        });

        res.status(201).json({
            message: "Hackathon created successfully",
            hackathon
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createHackathon
};