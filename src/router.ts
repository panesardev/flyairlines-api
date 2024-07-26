import { Router } from "express";
import { AuthRouter } from "./auth/auth.router";
import { UserRouter } from "./domains/users/user.router";
import { isAuthenticated } from "./auth/auth.middleware";

export const router = Router();

router.use('/auth', AuthRouter.router);
router.use('/users', isAuthenticated, UserRouter.router);
