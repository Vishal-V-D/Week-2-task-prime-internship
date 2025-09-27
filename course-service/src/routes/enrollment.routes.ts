import { Router } from "express";
import { EnrollmentController } from "../controllers/enrollment.controller";
import { authorize } from "../middleware/authorize";
import { authenticateJWT } from "../middleware/authenticateJWT";

const router = Router();

router.get("/courses", authenticateJWT, authorize(["student", "teacher"]), EnrollmentController.getCourses);

router.post("/", authenticateJWT, authorize(["student"]), EnrollmentController.create);
router.delete("/:id", authenticateJWT, authorize(["student"]), EnrollmentController.delete);

router.get("/", authenticateJWT, authorize(["teacher"]), EnrollmentController.getAll);
router.get("/:id", authenticateJWT, authorize(["teacher"]), EnrollmentController.getById);
router.put("/:id", authenticateJWT, authorize(["teacher"]), EnrollmentController.update);

export default router;
