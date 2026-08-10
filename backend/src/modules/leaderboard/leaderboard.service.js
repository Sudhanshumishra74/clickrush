import { prisma } from "../../common/config/db.js";

const getGlobalLeaderboard = async (limit = 10) => {
  const results = await prisma.gameResult.findMany({
    orderBy: [
      {
        score: "desc",
      },
      {
        playedAt: "asc",
      },
    ],

    select: {
      userId: true,
      score: true,
      clicks: true,
      playedAt: true,

      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const bestByUser = new Map();

  for (const result of results) {
    if (!bestByUser.has(result.userId)) {
      bestByUser.set(result.userId, result);
    }
  }

  const leaderboard = Array.from(bestByUser.values())
    .slice(0, limit)
    .map((result, index) => ({
      rank: index + 1,
      user: result.user,
      score: result.score,
      clicks: result.clicks,
      playedAt: result.playedAt,
    }));

  return leaderboard;
};

const getDailyLeaderboard = async (limit = 10) => {
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
      {
        score: "desc",
      },
      {
        playedAt: "asc",
      },
    ],

    select: {
      userId: true,
      score: true,
      clicks: true,
      playedAt: true,

      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const bestByUser = new Map();

  for (const result of results) {
    if (!bestByUser.has(result.userId)) {
      bestByUser.set(result.userId, result);
    }
  }

  const leaderboard = Array.from(bestByUser.values())
    .slice(0, limit)
    .map((result, index) => ({
      rank: index + 1,
      user: result.user,
      score: result.score,
      clicks: result.clicks,
      playedAt: result.playedAt,
    }));

  return leaderboard;
};


const getWeeklyLeaderboard = async (limit = 10) => {
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
      {
        score: "desc",
      },
      {
        playedAt: "asc",
      },
    ],

    select: {
      userId: true,
      score: true,
      clicks: true,
      playedAt: true,

      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const bestByUser = new Map();

  for (const result of results) {
    if (!bestByUser.has(result.userId)) {
      bestByUser.set(result.userId, result);
    }
  }

  const leaderboard = Array.from(bestByUser.values())
    .slice(0, limit)
    .map((result, index) => ({
      rank: index + 1,
      user: result.user,
      score: result.score,
      clicks: result.clicks,
      playedAt: result.playedAt,
    }));

  return leaderboard;
};

export {
  getGlobalLeaderboard,
  getWeeklyLeaderboard,
  getDailyLeaderboard,
};