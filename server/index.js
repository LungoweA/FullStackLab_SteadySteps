import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "SteadySteps API is running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});