import { Router } from "express";
import { register, login, getUsers, getUser, update, remove, getMe } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authMiddleware(["teacher"]), getUsers);
router.get("/:id", authMiddleware(["teacher"]), getUser);
router.put("/:id", authMiddleware(["teacher"]), update);
router.delete("/:id", authMiddleware(["teacher"]), remove);
router.get("/me/info", authMiddleware(["student"]), getMe);

export default router;
