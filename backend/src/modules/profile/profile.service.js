import { prisma } from "../../common/config/db.js";

const getMyProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,

      _count: {
        select: {
          gameResults: true,
        },
      },

      gameResults: {
        orderBy: {
          score: "desc",
        },

        take: 1,

        select: {
          score: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    totalGames: user._count.gameResults,
    bestScore: user.gameResults[0]?.score ?? 0,
  };
};

const getMyGameHistory = async (userId) => {
  const history = await prisma.gameResult.findMany({
    where: {
      userId,
    },

    orderBy: {
      playedAt: "desc",
    },

    select: {
      id: true,
      score: true,
      clicks: true,
      playedAt: true,
      gameSessionId: true,
    },
  });

  return history;
};

export {
  getMyProfile,
  getMyGameHistory,
};