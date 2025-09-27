import { AppDataSource } from "../config/db";
import { Course } from "../models/Course";

const courseRepo = AppDataSource.getRepository(Course);

export const CourseService = {
  async create(data: Partial<Course>) {
    const course = courseRepo.create(data);
    return await courseRepo.save(course);
  },

  async findAll(query?: any) {
    if (!query) {
      return await courseRepo.find({ relations: ["enrollments"] });
    }

    const { page = 1, limit = 10, category, sort } = query;
    const take = Number(limit) || 10;
    const skip = (Number(page) - 1) * take;

    let order: any = {};
    if (sort) {
      const [field, direction] = sort.split("_");
      order[field] = direction.toUpperCase() === "DESC" ? "DESC" : "ASC";
    }

    const where: any = {};
    if (category) {
      where.category = category;
    }

    const [data, total] = await courseRepo.findAndCount({
      where,
      order,
      skip,
      take,
      relations: ["enrollments"],
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
    return await courseRepo.findOne({ where: { id }, relations: ["enrollments"] });
  },

  async update(id: number, data: Partial<Course>) {
    await courseRepo.update(id, data);
    return await courseRepo.findOneBy({ id });
  },

  async delete(id: number) {
    return await courseRepo.delete(id);
  },
};
