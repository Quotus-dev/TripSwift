import { Router } from "express";
import { register, login } from "../src/controller/auth/auth.controller";

const router = Router();

router.route("/register").post(register as any);

router.route("/login").post(login as any);

export default router;