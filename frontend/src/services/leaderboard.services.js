import api from "./api.js";

const getGlobalLeaderboard = async () => {
  const response = await api.get("/leaderboard/global");

  return response.data;
};

const getDailyLeaderboard = async () => {
  const response = await api.get("/leaderboard/daily");

  return response.data;
};

const getWeeklyLeaderboard = async () => {
  const response = await api.get("/leaderboard/weekly");

  return response.data;
};

export {
  getGlobalLeaderboard,
  getDailyLeaderboard,
  getWeeklyLeaderboard,
};