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
router.get("/:id", getLogById);
router.put("/:id", updateLog);
router.delete("/:id", deleteLog);
router.get("/stats/average-steps/:userId", getAverageStepsByUser);

export default router;