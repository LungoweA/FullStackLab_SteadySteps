import DailyLog from "../models/DailyLog.js";

// CREATE
export const createLog = async (req, res) => {
  try {
    const log = await DailyLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL
export const getLogs = async (req, res) => {
  try {
    const logs = await DailyLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLogById = async (req, res) => {
  try {
    const log = await DailyLog.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateLog = async (req, res) => {
  try {
    const log = await DailyLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.json(log);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

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