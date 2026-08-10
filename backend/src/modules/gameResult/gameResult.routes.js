import { Router } from "express";
import authenticate from "../auth/auth.middleware.js";
import * as gameResultController from "./gameResult.controller.js";

const router = Router();

router.post(
  "/",
  authenticate,
  gameResultController.create
);

export default router;