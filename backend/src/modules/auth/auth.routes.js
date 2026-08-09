import {Router} from "express";
import validateMiddleware from "../../common/middleware/validate.middleware.js";
import * as authController from "./auth.controller.js";
import RegisterDto from "./dto/register.dto.js";

const router = Router();

router.post("/register", validateMiddleware(RegisterDto.schema), authController.register);

export default router;