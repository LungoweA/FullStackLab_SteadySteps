import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import dailyLogRoutes from "./routes/dailyLogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import cors from "cors"

dotenv.config({ path: "./server/.env" });

const app = express();


app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/dailylogs", dailyLogRoutes);

app.use("/api/users", userRoutes);

app.use("/api/goals", goalRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});