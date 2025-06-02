import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const router = Router();
const controller = new AuthController();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

export default router;
