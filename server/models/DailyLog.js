import mongoose from "mongoose";

const dailyLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  steps: {
    type: Number,
    required: true,
    min: 0
  },
  stairs: {
    type: Number,
    required: true,
    min: 0
  },
  weight: {
    type: Number,
    required: true
  },
  mood: {
    type: String,
    enum: ["low", "ok", "good", "great"],
    default: "ok"
  }
});

const DailyLog = mongoose.model("DailyLog", dailyLogSchema);

export default DailyLog;