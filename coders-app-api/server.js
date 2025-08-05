const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: ".env.local" });

const authRoutes = require("./routes/authRoutes");
const verifyEmailRoute = require('./routes/verify'); // Make sure filename matches!

const app = express();  // Create express app first!

const challengeRoutes = require('./routes/challengeRoutes');
app.use('/api/challenges', challengeRoutes);



app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", verifyEmailRoute);
app.use(challengesRoutes);


mongoose
  .connect(process.env.MONGODB_URI, { dbName: "coders-app" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });