import { Router } from "express";
const router = Router();

import * as authController from "../controllers/authController";
import {verifyJwt} from "../middlewares"

router.post("/signup",verifyJwt.checkDuplicateUsernameOrEmail,authController.signUp)
router.post("/signin",authController.signIn)


export default router;