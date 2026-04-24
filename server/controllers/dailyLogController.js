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