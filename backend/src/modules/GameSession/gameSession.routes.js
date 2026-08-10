import { Router } from "express";
import authenticate from "../auth/auth.middleware.js";
import * as gameSessionController from "./gameSession.controller.js";

const router = Router();

router.post("/", authenticate, gameSessionController.create);
router.post("/:sessionId/complete", authenticate,gameSessionController.complete);

export default router;