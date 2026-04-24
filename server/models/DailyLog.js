import mongoose from "mongoose";

const dailyLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
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
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const DailyLog = mongoose.model("DailyLog", dailyLogSchema);

export default DailyLog;