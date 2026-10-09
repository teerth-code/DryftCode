const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const hackathonRoutes = require("./routes/hackathonRoutes");
const teamRoutes = require("./routes/teamRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const winnerRoutes = require("./routes/winnerRoutes");
const resultsRoutes = require("./routes/resultsRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/teams", teamRoutes);  
app.use("/api/submissions", submissionRoutes);
app.use("/api/winners", winnerRoutes);
app.use("/api/results", resultsRoutes);
app.use("/api/verification", verificationRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "DryftCode backend is running 🚀"
    });
});

module.exports = app;
