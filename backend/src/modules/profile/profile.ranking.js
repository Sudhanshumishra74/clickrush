import { prisma } from "../../common/config/db.js";

const getRank = (results, userId) => {
  const bestByUser = new Map();

  for (const result of results) {
    if (!bestByUser.has(result.userId)) {
      bestByUser.set(result.userId, result);
    }
  }

  const users = Array.from(bestByUser.values());

  const index = users.findIndex(
    (user) => user.userId === userId
  );

  return index === -1 ? null : index + 1;
};

const getUserGlobalRank = async (userId) => {
  const results = await prisma.gameResult.findMany({
    orderBy: [
      { score: "desc" },
      { playedAt: "asc" },
    ],
    select: {
      userId: true,
      score: true,
      playedAt: true,
    },
  });

  return getRank(results, userId);
};

const getUserDailyRank = async (userId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const results = await prisma.gameResult.findMany({
    where: {
      playedAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: [
      { score: "desc" },
      { playedAt: "asc" },
    ],
    select: {
      userId: true,
      score: true,
      playedAt: true,
    },
  });

  return getRank(results, userId);
};

const getUserWeeklyRank = async (userId) => {
  const now = new Date();

  const day = now.getDay();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - day);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + (6 - day));
  endOfWeek.setHours(23, 59, 59, 999);

  const results = await prisma.gameResult.findMany({
    where: {
      playedAt: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    orderBy: [
      { score: "desc" },
      { playedAt: "asc" },
    ],
    select: {
      userId: true,
      score: true,
      playedAt: true,
    },
  });

  return getRank(results, userId);
};

const getMyRank = async (userId) => {
  const [globalRank, dailyRank, weeklyRank] =
    await Promise.all([
      getUserGlobalRank(userId),
      getUserDailyRank(userId),
      getUserWeeklyRank(userId),
    ]);

  return {
    globalRank,
    dailyRank,
    weeklyRank,
  };
};

export {
  getMyRank,
};