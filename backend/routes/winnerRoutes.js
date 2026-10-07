const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const { markWinner } = require("../controllers/winnerController");

const router = express.Router();

router.patch(
    "/:submissionId",
    authenticateToken,
    requireRole("ORGANIZER"),
    markWinner
);

module.exports = router;