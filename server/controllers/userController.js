import User from "../models/User.js";

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { name, age, height } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!age || age <= 0) {
      return res.status(400).json({ message: "Age must be a positive number" });
    }

    if (!height || height <= 0) {
      return res.status(400).json({ message: "Height must be a positive number" });
    }

    const user = await User.create({ name, age, height });
    res.status(201).json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};