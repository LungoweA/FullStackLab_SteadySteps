import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import dailyLogRoutes from "./routes/dailyLogRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/dailylogs", dailyLogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});