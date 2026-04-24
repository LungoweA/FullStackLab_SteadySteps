import express from "express";
import { createLog, getLogs } from "../controllers/dailyLogController.js";

const router = express.Router();

router.post("/", createLog);
router.get("/", getLogs);

export default router;