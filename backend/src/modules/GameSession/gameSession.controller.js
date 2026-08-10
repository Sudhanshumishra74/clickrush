import ApiResponse from "../../common/utils/apiResponse.js";
import * as session from "./gameSession.service.js"


const create  =  async (req,res) => {
     
    const gameSession =  await session.createGameSession(req.user.id)
 
    return ApiResponse.created(
    res,
    "Game started successfully",
    gameSession
  );
}

const complete = async (req, res) => {
  const { sessionId } = req.params;

  const gameSession =
    await session.completeGameSession(
      Number(sessionId),
      req.user.id
    );

  return ApiResponse.ok(
    res,
    "Game completed successfully",
    gameSession
  );
};


export { create , complete}

