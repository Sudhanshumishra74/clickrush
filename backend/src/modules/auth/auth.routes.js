import {Router} from "express";
import validateMiddleware from "../../common/middleware/validate.middleware.js";
import * as authController from "./auth.controller.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import authenticate from "./auth.middleware.js";

const router = Router();

router.post("/register", validateMiddleware(RegisterDto.schema), authController.register);
router.post("/login", validateMiddleware(LoginDto.schema), authController.login);
router.post("/logout", authenticate, authController.logout);
router.post("/refresh", authController.refresh);
router.get("/me",authenticate,authController.me);
export default router;