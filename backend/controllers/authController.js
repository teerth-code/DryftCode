const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const PasswordResetToken = require("../models/PasswordResetToken");

const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");


// ================= COLLEGE EMAIL CHECK =================

const isCollegeEmail = (email) => {
    return email.toLowerCase().endsWith("@vitstudent.ac.in");
};


// ================= STUDENT SIGNUP =================

const studentSignup = async (req, res) => {
    try {
        const { name, email, password, collegeName } = req.body;

        if (!name || !email || !password || !collegeName) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (!isCollegeEmail(email)) {
            return res.status(400).json({
                message: "Please use your college email address"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            collegeName,
            role: "STUDENT"
        });

        // Create email verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        await VerificationToken.create({
            userId: user._id,
            token: verificationToken,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        const verificationLink =
            `http://localhost:5050/api/auth/verify-email?token=${verificationToken}`;

        await sendEmail(
            user.email,
            "Verify your DryftCode account",
            `Hello ${user.name},

Please verify your DryftCode account by clicking the link below:

${verificationLink}

This link will expire in 24 hours.

DryftCode`
        );

        res.status(201).json({
            message: "Student created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= ORGANIZER SIGNUP =================

const organizerSignup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            collegeName,
            clubName,
            clubDescription
        } = req.body;

        if (!name || !email || !password || !collegeName || !clubName) {
            return res.status(400).json({
                message: "All required fields are required"
            });
        }

        if (!isCollegeEmail(email)) {
            return res.status(400).json({
                message: "Please use your college email address"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            collegeName,
            role: "ORGANIZER",
            clubName,
            clubDescription
        });

        // Create email verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        await VerificationToken.create({
            userId: user._id,
            token: verificationToken,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        const verificationLink =
            `http://localhost:5050/api/auth/verify-email?token=${verificationToken}`;

        await sendEmail(
            user.email,
            "Verify your DryftCode organizer account",
            `Hello ${user.name},

Please verify your DryftCode organizer account by clicking the link below:

${verificationLink}

This link will expire in 24 hours.

DryftCode`
        );

        res.status(201).json({
            message: "Organizer created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                clubName: user.clubName
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= LOGIN =================

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Email verification check
        if (!user.isEmailVerified) {
            return res.status(403).json({
                message: "Please verify your email before logging in"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= VERIFY EMAIL =================

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                message: "Verification token is required"
            });
        }

        const verificationToken = await VerificationToken.findOne({
            token
        });

        if (!verificationToken) {
            return res.status(400).json({
                message: "Invalid or expired verification token"
            });
        }

        if (verificationToken.expiresAt < new Date()) {
            await VerificationToken.deleteOne({
                _id: verificationToken._id
            });

            return res.status(400).json({
                message: "Verification token has expired"
            });
        }

        const user = await User.findById(
            verificationToken.userId
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.isEmailVerified = true;

        await user.save();

        await VerificationToken.deleteOne({
            _id: verificationToken._id
        });

        res.status(200).json({
            message: "Email verified successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= FORGOT PASSWORD =================

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "No account found with this email"
            });
        }

        // Delete old reset tokens
        await PasswordResetToken.deleteMany({
            userId: user._id
        });

        // Generate secure reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        await PasswordResetToken.create({
            userId: user._id,
            token: resetToken,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000)
        });

        const resetLink =
            `http://localhost:5050/api/auth/reset-password?token=${resetToken}`;

        await sendEmail(
            user.email,
            "Reset your DryftCode password",
            `Hello ${user.name},

We received a request to reset your DryftCode password.

Click the link below to reset your password:

${resetLink}

This link will expire in 15 minutes.

If you did not request this, you can safely ignore this email.

DryftCode`
        );

        res.status(200).json({
            message: "Password reset email sent successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= RESET PASSWORD =================

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                message: "Token and new password are required"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }

        const resetToken = await PasswordResetToken.findOne({
            token
        });

        if (!resetToken) {
            return res.status(400).json({
                message: "Invalid or expired reset token"
            });
        }

        if (resetToken.expiresAt < new Date()) {
            await PasswordResetToken.deleteOne({
                _id: resetToken._id
            });

            return res.status(400).json({
                message: "Reset token has expired"
            });
        }

        const user = await User.findById(resetToken.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        await user.save();

        // Delete token so it cannot be reused
        await PasswordResetToken.deleteOne({
            _id: resetToken._id
        });

        res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= EXPORTS =================

module.exports = {
    studentSignup,
    organizerSignup,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword
};