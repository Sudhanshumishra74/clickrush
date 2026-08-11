import api from "./api.js";

const getProfile = async () => {
  const response = await api.get("/profile");

  return response.data;
};

const getGameHistory = async () => {
  const response = await api.get("/profile/game-history");

  return response.data;
};

const getRankings = async () => {
  const response = await api.get("/profile/rankings");

  return response.data;
};

export {
  getProfile,
  getGameHistory,
  getRankings,
};