const express = require("express");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const gradingRoutes = require("./routes/gradingRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/submit", gradingRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/statistics", statisticsRoutes);

module.exports = app;
