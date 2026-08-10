import * as gameResultService from "./gameResult.service.js";
import ApiResponse from "../../common/utils/apiResponse.js";

const create = async (req, res) => {
  const { gameSessionId, clicks } = req.body;

  const gameResult = await gameResultService.createGameResult({
    userId: req.user.id,
    gameSessionId: Number(gameSessionId),
    clicks,
  });

  return ApiResponse.created(
    res,
    "Game result created successfully",
    gameResult
  );
};

export {
  create,
};