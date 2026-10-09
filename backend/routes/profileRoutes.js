const express = require("express");

const {
    getMyProfile,
    updateMyProfile
} = require("../controllers/profileController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authenticateToken, getMyProfile);

router.put("/me", authenticateToken, updateMyProfile);

module.exports = router;