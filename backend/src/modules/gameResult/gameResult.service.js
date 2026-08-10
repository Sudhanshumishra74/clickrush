import { prisma } from "../../common/config/db.js";
import ApiError from "../../common/utils/apiError.js";

const createGameResult = async ({
  userId,
  gameSessionId,
  clicks,
}) => {

  // 1. clicks validation
  if (!Number.isInteger(clicks) || clicks < 0) {
    throw ApiError.badRequest("Invalid clicks");
  }

  // 2. GameSession find
  const session = await prisma.gameSession.findUnique({
    where: {
      id: gameSessionId,
    },
  });

  if (!session) {
    throw ApiError.notFound("Game session not found");
  }

  // 3. User ownership
  if (session.userId !== userId) {
    throw ApiError.forbidden(
      "You cannot access this game session"
    );
  }

  // 4. Game completed?
  if (session.status !== "COMPLETED") {
    throw ApiError.badRequest(
      "Game session is not completed"
    );
  }

  // 5. Result already exists?
  const existingResult = await prisma.gameResult.findUnique({
    where: {
      gameSessionId,
    },
  });

  if (existingResult) {
    throw ApiError.conflict(
      "Game result already exists"
    );
  }

  // 6. Backend score calculation
  const score = clicks * 10;

  // 7. Save result
  const gameResult = await prisma.gameResult.create({
    data: {
      userId,
      gameSessionId,
      clicks,
      score,
    },
  });

  return gameResult;
};

export {
  createGameResult,
};