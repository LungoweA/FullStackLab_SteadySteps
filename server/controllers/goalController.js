import Goal from "../models/Goal.js";

// CREATE GOAL
export const createGoal = async (req, res) => {
  try {
    const { userId, dailyStepGoal, targetWeight } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User is required" });
    }

    if (dailyStepGoal == null || dailyStepGoal <= 0) {
      return res.status(400).json({ message: "Daily step goal must be greater than 0" });
    }

    if (targetWeight == null || targetWeight <= 0) {
      return res.status(400).json({ message: "Target weight must be greater than 0" });
    }

    const goal = await Goal.findOneAndUpdate(
      { userId },          // find goal for this user
      { dailyStepGoal, targetWeight }, // replace values
      { new: true, upsert: true } // create if doesn't exist
    );

    res.status(201).json(goal);

  } catch (err) {
    res.status(500).json({ message: err.message });
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
    const { dailyStepGoal, targetWeight } = req.body;

    if (dailyStepGoal !== undefined && dailyStepGoal <= 0) {
      return res.status(400).json({ message: "Daily step goal must be greater than 0" });
    }

    if (targetWeight !== undefined && targetWeight <= 0) {
      return res.status(400).json({ message: "Target weight must be greater than 0" });
    }

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
    res.status(500).json({ message: err.message });
  }
};