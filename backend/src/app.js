import express from "express";
import errorMiddleware from "./common/middleware/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";


const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRoutes);



app.use(errorMiddleware);

export default app;