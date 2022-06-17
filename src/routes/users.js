import { Router } from "express";
const router = Router();

import * as usersController from "../controllers/usersController";
import { authJwt } from "../middlewares";

router.get("/",authJwt.verifyToken ,usersController.getUsers)
router.get("/:userId",authJwt.verifyToken ,usersController.getUserById)

export default router;