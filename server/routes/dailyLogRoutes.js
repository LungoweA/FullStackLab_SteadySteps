import express from "express";
import {
  createLog,
  getLogs,
  getLogById,
  updateLog,
  deleteLog,
  getAverageStepsByUser
} from "../controllers/dailyLogController.js";

const router = express.Router();

router.post("/", createLog);
router.get("/", getLogs);
router.get("/stats/average-steps/:userId", getAverageStepsByUser);
router.get("/:id", getLogById);
router.put("/:id", updateLog);
router.delete("/:id", deleteLog);

export default router;