import express from "express";
import errorMiddleware from "./common/middleware/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import cookieParser from "cookie-parser";
import gameSessionRoutes from "./modules/gameSession/gameSession.routes.js"; 
import gameResultRoutes from "./modules/gameResult/gameResult.routes.js";


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/game-sessions", gameSessionRoutes);
app.use("/api/v1/game-results",gameResultRoutes);

app.use(errorMiddleware);

export default app;