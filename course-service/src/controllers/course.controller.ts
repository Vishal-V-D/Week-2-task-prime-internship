import { Request, Response } from "express";
import { CourseService } from "../services/course.service";

export const CourseController = {
  async create(req: Request, res: Response) {
    try {
      const course = await CourseService.create(req.body);
      res.status(201).json(course);
    } catch (err) {
      res.status(500).json({ error: "Failed to create course", details: err });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await CourseService.findAll(req.query);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch courses", details: err });
    }
  },

  async getById(req: Request, res: Response) {
    const course = await CourseService.findById(Number(req.params.id));
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  },

  async update(req: Request, res: Response) {
    const course = await CourseService.update(Number(req.params.id), req.body);
    res.json(course);
  },

  async delete(req: Request, res: Response) {
    await CourseService.delete(Number(req.params.id));
    res.json({ message: "Course deleted" });
  },
};
