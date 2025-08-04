const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: ".env.local" });

const authRoutes = require("./routes/authRoutes");
const verifyEmailRoute = require('./routes/verify'); // Make sure filename matches!

const app = express();  // Create express app first!

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", verifyEmailRoute);

mongoose
  .connect(process.env.MONGODB_URI, { dbName: "coders-app" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
