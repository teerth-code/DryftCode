const Submission = require("../models/Submission");
const Hackathon = require("../models/Hackathon");
const Team = require("../models/Team");

const createSubmission = async (req, res) => {
    try {
        const {
            hackathonId,
            teamId,
            projectName,
            description,
            githubLink,
            demoLink,
            techStack,
            track
        } = req.body;

        const hackathon = await Hackathon.findById(hackathonId);

        if (!hackathon) {
            return res.status(404).json({
                message: "Hackathon not found"
            });
        }

        if (new Date() > hackathon.submissionDeadline) {
            return res.status(400).json({
                message: "Submission deadline has passed"
            });
        }

        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({
                message: "Team not found"
            });
        }

        console.log("JWT USER ID:", req.user.id);
        console.log(
            "TEAM MEMBERS:",
            team.members.map(member => member.toString())
        );

        const isMember = team.members.some(
            member => member.toString() === req.user.id.toString()
        );

        if (!isMember) {
            return res.status(403).json({
                message: "You are not a member of this team"
            });
        }

        if (team.hackathon.toString() !== hackathonId.toString()) {
            return res.status(400).json({
                message: "Team does not belong to this hackathon"
            });
        }

        if (!hackathon.tracks.includes(track)) {
            return res.status(400).json({
                message: "Invalid track"
            });
        }

        const existingSubmission = await Submission.findOne({
            hackathon: hackathonId,
            team: teamId
        });

        if (existingSubmission) {
            return res.status(400).json({
                message: "Team has already submitted"
            });
        }

        const submission = await Submission.create({
            hackathon: hackathonId,
            team: teamId,
            submittedBy: req.user.id,
            projectName,
            description,
            githubLink,
            demoLink,
            techStack,
            track
        });

        res.status(201).json({
            message: "Project submitted successfully",
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
    createSubmission
};