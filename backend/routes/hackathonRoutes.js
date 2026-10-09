const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const { createHackathon } = require("../controllers/hackathonController");

const router = express.Router();

router.post(
    "/",
    authenticateToken,
    requireRole("ORGANIZER"),
    createHackathon
);

module.exports = router;