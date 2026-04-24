import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  dailyStepGoal: {
    type: Number,
    required: true,
    min: 0
  },
  targetWeight: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;