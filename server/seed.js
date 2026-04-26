import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import User from "./models/User.js";
import DailyLog from "./models/DailyLog.js";
import Goal from "./models/Goal.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // clear existing data
    await User.deleteMany();
    await DailyLog.deleteMany();
    await Goal.deleteMany();

    console.log("Old data cleared");

    // create users
    const users = await User.insertMany([
      { name: "Lunsia", age: 22, height: 165 },
      { name: "Arnold", age: 28, height: 180 },
      { name: "Mate", age: 24, height: 175 },
      { name: "Jenny", age: 21, height: 162 },
      { name: "Lilly", age: 23, height: 168 }
    ]);

    console.log("Users created");

    // create logs
    const logs = [];

    users.forEach((user) => {
      logs.push(
        {
          steps: 7500 + Math.floor(Math.random() * 3000),
          stairs: 5 + Math.floor(Math.random() * 10),
          weight: 60 + Math.floor(Math.random() * 15),
          mood: "good",
          userId: user._id
        },
        {
          steps: 5000 + Math.floor(Math.random() * 2000),
          stairs: 3 + Math.floor(Math.random() * 5),
          weight: 60 + Math.floor(Math.random() * 15),
          mood: "ok",
          userId: user._id
        },
        {
          steps: 9000 + Math.floor(Math.random() * 4000),
          stairs: 10 + Math.floor(Math.random() * 10),
          weight: 60 + Math.floor(Math.random() * 15),
          mood: "great",
          userId: user._id
        }
      );
    });

    await DailyLog.insertMany(logs);

    console.log("Logs created");

    // create one goal per user
    const goals = users.map((user, index) => ({
      dailyStepGoal: 7000 + index * 500,
      targetWeight: 65 + index,
      userId: user._id
    }));

    await Goal.insertMany(goals);

    console.log("Goals created");

    console.log("Database seeded successfully!");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();