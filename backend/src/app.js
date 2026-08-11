import express from "express";
import errorMiddleware from "./common/middleware/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import cookieParser from "cookie-parser";
import gameSessionRoutes from "./modules/GameSession/gameSession.routes.js"; 
import gameResultRoutes from "./modules/gameResult/gameResult.routes.js";
import leaderboardRoutes from "./modules/leaderboard/leaderboard.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
     credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/game-sessions", gameSessionRoutes);
app.use("/api/v1/game-results",gameResultRoutes);
app.use("/api/v1/leaderboard",leaderboardRoutes);


app.use( "/api/v1/profile", profileRoutes);

app.use(errorMiddleware);

export default app;