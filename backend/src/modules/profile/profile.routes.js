import { Router } from "express";
import authenticate from "../auth/auth.middleware.js";
import * as profileController from "./profile.controller.js";

const router = Router();

router.get("/",authenticate,profileController.getMyProfile);

router.get("/game-history",authenticate,profileController.getMyGameHistory);

router.get("/rankings",authenticate,profileController.getMyRank);

export default router;