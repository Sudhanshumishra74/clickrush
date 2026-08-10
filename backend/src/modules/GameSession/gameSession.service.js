import { prisma } from "../../common/config/db.js";
import ApiError from "../../common/utils/apiError.js";

const createGameSession = async (userId) => {
  const gameSession = await prisma.gameSession.create({
    data: {
      userId,
    },
  });

  return gameSession;
};

const completeGameSession = async (sessionId, userId) => {
  const session = await prisma.gameSession.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!session) {
    throw ApiError.notFound("Game session not found");
  }

  if (session.userId !== userId) {
    throw ApiError.forbidden(
      "You cannot access this game session"
    );
  }

  if (session.status === "COMPLETED") {
    throw ApiError.badRequest(
      "Game session already completed"
    );
  }

  const now = new Date();

  const elapsedTime =
    (now.getTime() - session.startedAt.getTime()) / 1000;

  if (elapsedTime < 60) {
    throw ApiError.badRequest(
      "Game cannot be completed before 60 seconds"
    );
  }

  const completedSession = await prisma.gameSession.update({
    where: {
      id: sessionId,
    },
    data: {
      status: "COMPLETED",
      endedAt: now,
    },
  });

  return completedSession;
};

export {
  createGameSession,
  completeGameSession,
};