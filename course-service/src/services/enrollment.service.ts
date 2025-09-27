import { AppDataSource } from "../config/db";
import { Enrollment } from "../models/Enrollment";
import { Course } from "../models/Course";
const enrollmentRepo = AppDataSource.getRepository(Enrollment);
const courseRepo = AppDataSource.getRepository(Course);

export const EnrollmentService = {
  async create(data: { studentName: string; studentEmail: string; courseId: number }) {
    const course = await courseRepo.findOneBy({ id: data.courseId });
    if (!course) throw new Error("Course not found");

    const existing = await enrollmentRepo.findOne({
      where: { studentEmail: data.studentEmail, course: { id: data.courseId } },
      relations: ["course"],
    });
    if (existing) throw new Error("Student already enrolled in this course");

    const enrollment = enrollmentRepo.create({
      studentName: data.studentName,
      studentEmail: data.studentEmail,
      course: course,
    });

    return await enrollmentRepo.save(enrollment);
  }
,
  async findAll(query: any) {
    const { page = 1, limit = 10, studentEmail, sort } = query;
    const take = Number(limit) || 10;
    const skip = (Number(page) - 1) * take;

    let order: any = {};
    if (sort) {
      const [field, direction] = sort.split("_");
      order[field] = direction.toUpperCase() === "DESC" ? "DESC" : "ASC";
    }

    const where: any = {};
    if (studentEmail) where.studentEmail = studentEmail;

    const [data, total] = await enrollmentRepo.findAndCount({
      where,
      order,
      skip,
      take,
      relations: ["course"],
    });

    return {
      total,
      page: Number(page),
      limit: take,
      totalPages: Math.ceil(total / take),
      data,
    };
  },

  async findById(id: number) {
    return await enrollmentRepo.findOne({ where: { id }, relations: ["course"] });
  },

  async update(id: number, data: Partial<Enrollment>) {
    await enrollmentRepo.update(id, data);
    return await enrollmentRepo.findOneBy({ id });
  },

  async delete(id: number) {
    return await enrollmentRepo.delete(id);
  },
};
