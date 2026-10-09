const express = require("express");

const { getResults } = require("../controllers/resultsController");

const router = express.Router();

router.get(
    "/:hackathonId",
    getResults
);

module.exports = router;