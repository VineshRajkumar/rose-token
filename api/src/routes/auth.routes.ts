import { Router } from "express";
import { logout,signup,login } from "../controller/auth.controller";

const router=Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;