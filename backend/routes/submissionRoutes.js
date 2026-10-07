const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const {
    createSubmission
} = require("../controllers/submissionController");

const router = express.Router();

router.post(
    "/",
    authenticateToken,
    createSubmission
);

module.exports = router;