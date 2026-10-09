const User = require("../models/User");

const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const updateMyProfile = async (req, res) => {
    try {
        const {
            name,
            bio,
            skills,
            github,
            linkedin,
            profilePicture
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (name !== undefined) user.name = name;
        if (bio !== undefined) user.bio = bio;
        if (skills !== undefined) user.skills = skills;
        if (github !== undefined) user.github = github;
        if (linkedin !== undefined) user.linkedin = linkedin;
        if (profilePicture !== undefined) {
            user.profilePicture = profilePicture;
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                collegeName: user.collegeName,
                bio: user.bio,
                skills: user.skills,
                github: user.github,
                linkedin: user.linkedin,
                profilePicture: user.profilePicture
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    getMyProfile,
    updateMyProfile
};