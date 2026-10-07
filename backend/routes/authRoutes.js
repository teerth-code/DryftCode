const express = require("express");

const {
    studentSignup,
    organizerSignup,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

const authenticateToken = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const router = express.Router();


// ================= PUBLIC AUTH ROUTES =================

// Student signup
router.post("/student/signup", studentSignup);

// Organizer signup
router.post("/organizer/signup", organizerSignup);

// Login
router.post("/login", login);

// Email verification
router.get("/verify-email", verifyEmail);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password", resetPassword);


// ================= PROTECTED ROUTES =================

// Get currently logged-in user
router.get("/me", authenticateToken, (req, res) => {
    res.status(200).json({
        message: "User profile fetched successfully",
        user: req.user
    });
});


// Student-only test route
router.get(
    "/student-only",
    authenticateToken,
    requireRole("STUDENT"),
    (req, res) => {
        res.status(200).json({
            message: "Student access granted",
            user: req.user
        });
    }
);


// Organizer-only test route
router.get(
    "/organizer-only",
    authenticateToken,
    requireRole("ORGANIZER"),
    (req, res) => {
        res.status(200).json({
            message: "Organizer access granted",
            user: req.user
        });
    }
);


// ================= EXPORT =================

module.exports = router;