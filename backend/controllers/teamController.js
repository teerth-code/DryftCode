const Team = require("../models/Team");
const Hackathon = require("../models/Hackathon");

const createTeam = async (req, res) => {
    try {
        const { name, hackathonId } = req.body;

        const hackathon = await Hackathon.findById(hackathonId);

        if (!hackathon) {
            return res.status(404).json({
                message: "Hackathon not found"
            });
        }

        const team = await Team.create({
            name,
            code: Math.random().toString(36).substring(2, 8).toUpperCase(),
            hackathon: hackathonId,
            leader: req.user.id,
            members: [req.user.id]
        });

        res.status(201).json({
            message: "Team created successfully",
            team
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const joinTeam = async (req, res) => {
    try {
        const { code } = req.body;

        const team = await Team.findOne({ code });

        if (!team) {
            return res.status(404).json({
                message: "Team not found"
            });
        }

        if (team.members.includes(req.user.id)) {
            return res.status(400).json({
                message: "You are already in this team"
            });
        }

        const hackathon = await Hackathon.findById(team.hackathon);

        if (!hackathon) {
            return res.status(404).json({
                message: "Hackathon not found"
            });
        }

        if (team.members.length >= hackathon.maxTeamSize) {
            return res.status(400).json({
                message: "Team is full"
            });
        }

        team.members.push(req.user.id);

        await team.save();

        res.status(200).json({
            message: "Joined team successfully",
            team
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createTeam,
    joinTeam
};