import { Request, Response } from "express";
import { EnrollmentService } from "../services/enrollment.service";
import { AppDataSource } from "../config/db";
import { Course } from "../models/Course";
import { AuthRequest } from "../middleware/authenticateJWT";
export const EnrollmentController = {
 async create(req: AuthRequest, res: Response) {
    try {
      if (req.user?.role === "student") {
        if (req.user.email !== req.body.studentEmail) {
          return res.status(403).json({ message: "Students can only enroll themselves" });
        }
      }

      const enrollment = await EnrollmentService.create(req.body);
      res.status(201).json(enrollment);
    } catch (err) {
      res.status(500).json({ error: "Failed to create enrollment", details: err });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await EnrollmentService.findAll(req.query);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch enrollments", details: err });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const enrollment = await EnrollmentService.findById(Number(req.params.id));
      if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });
      res.json(enrollment);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch enrollment", details: err });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const enrollment = await EnrollmentService.update(Number(req.params.id), req.body);
      res.json(enrollment);
    } catch (err) {
      res.status(500).json({ error: "Failed to update enrollment", details: err });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await EnrollmentService.delete(Number(req.params.id));
      res.json({ message: "Enrollment deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete enrollment", details: err });
    }
  },

  async getCourses(req: Request, res: Response) {
    try {
      const courseRepo = AppDataSource.getRepository(Course);
      const courses = await courseRepo.find();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch courses", details: err });
    }
  },
};
