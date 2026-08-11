import api from "./api.js";

const startGame = async () => {
  const response = await api.post("/game-sessions");

  return response.data;
};

const completeGame = async (sessionId) => {
  const response = await api.post(
    `/game-sessions/${sessionId}/complete`
  );

  return response.data;
};

const submitGameResult = async (gameSessionId, clicks) => {
  const response = await api.post(
    "/game-results",
    {
      gameSessionId,
      clicks,
    }
  );

  return response.data;
};

export {
  startGame,
  completeGame,
  submitGameResult,
};