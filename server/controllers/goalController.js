import Goal from "../models/Goal.js";

// CREATE GOAL
export const createGoal = async (req, res) => {
  try {
    const goal = await Goal.create(req.body);
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL GOALS
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find().populate("userId");
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE GOAL
export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("userId");

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json(goal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};