import * as leaderboardService from "./leaderboard.service.js";
import ApiResponse from "../../common/utils/apiResponse.js";

const getGlobalLeaderboard = async (req, res) => {
  const leaderboard =
    await leaderboardService.getGlobalLeaderboard();

  return ApiResponse.ok(
    res,
    "Global leaderboard fetched successfully",
    leaderboard
  );
};

const getDailyLeaderboard = async (req, res) => {
  const leaderboard =
    await leaderboardService.getDailyLeaderboard();

  return ApiResponse.ok(
    res,
    "Daily leaderboard fetched successfully",
    leaderboard
  );
};

const getWeeklyLeaderboard = async (req, res) => {
  const leaderboard =
    await leaderboardService.getWeeklyLeaderboard();

  return ApiResponse.ok(
    res,
    "Weekly leaderboard fetched successfully",
    leaderboard
  );
};

export {
  getGlobalLeaderboard,
  getDailyLeaderboard,
  getWeeklyLeaderboard
};