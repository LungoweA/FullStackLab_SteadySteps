import DailyLog from "../models/DailyLog.js";

// CREATE
export const createLog = async (req, res) => {
  try {
    const { steps, stairs, weight, mood, userId } = req.body;
    if (!validMoods.includes(mood)) {
        return res.status(400).json({ message: "Invalid mood value" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User is required" });
    }

    if (steps == null || steps < 0) {
      return res.status(400).json({ message: "Steps must be a positive number" });
    }

    if (stairs == null || stairs < 0) {
      return res.status(400).json({ message: "Stairs must be a positive number" });
    }

    if (weight == null || weight <= 0) {
      return res.status(400).json({ message: "Weight must be greater than 0" });
    }

    if (!mood || mood.trim() === "") {
      return res.status(400).json({ message: "Mood is required" });
    }

    const log = await DailyLog.create(req.body);
    res.status(201).json(log);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ALL
export const getLogs = async (req, res) => {
  try {
    const logs = await DailyLog.find().populate("userId");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE (by ID)
export const getLogById = async (req, res) => {
  try {
    const log = await DailyLog.findById(req.params.id).populate("userId");

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateLog = async (req, res) => {
  try {
    const { steps, stairs, weight, mood } = req.body;

    if (steps !== undefined && steps < 0) {
      return res.status(400).json({ message: "Steps must be positive" });
    }

    if (stairs !== undefined && stairs < 0) {
      return res.status(400).json({ message: "Stairs must be positive" });
    }

    if (weight !== undefined && weight <= 0) {
      return res.status(400).json({ message: "Weight must be greater than 0" });
    }

    const validMoods = ["low", "ok", "good", "great"];

    if (mood !== undefined && !validMoods.includes(mood)) {
        return res.status(400).json({ message: "Invalid mood value" });
    }

    const log = await DailyLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("userId");

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.json(log);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteLog = async (req, res) => {
  try {
    const log = await DailyLog.findByIdAndDelete(req.params.id);

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.json({ message: "Log deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// AVERAGE STEPS FOR ONE USER
export const getAverageStepsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const logs = await DailyLog.find({ userId });

    if (logs.length === 0) {
      return res.status(404).json({ message: "No logs found for this user" });
    }

    const totalSteps = logs.reduce((sum, log) => sum + log.steps, 0);
    const averageSteps = totalSteps / logs.length;

    res.json({
      userId,
      totalLogs: logs.length,
      averageSteps: Math.round(averageSteps)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};