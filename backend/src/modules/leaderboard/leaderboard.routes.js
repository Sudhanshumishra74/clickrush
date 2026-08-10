import { Router } from "express";
import * as leaderboardController from "./leaderboard.controller.js";

const router = Router();

router.get( "/global",leaderboardController.getGlobalLeaderboard);
router.get("/weekly",leaderboardController.getWeeklyLeaderboard);

router.get("/daily",leaderboardController.getDailyLeaderboard);

export default router;