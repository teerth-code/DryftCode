const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const {
    createTeam,
    joinTeam
} = require("../controllers/teamController");

const router = express.Router();

router.post(
    "/",
    authenticateToken,
    requireRole("STUDENT"),
    createTeam
);

router.post(
    "/join",
    authenticateToken,
    requireRole("STUDENT"),
    joinTeam
);

module.exports = router;