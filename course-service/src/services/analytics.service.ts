
import { AppDataSource } from "../config/db";
import { Enrollment } from "../models/Enrollment";
import { Course } from "../models/Course";

export const AnalyticsService = {
  async getOverview() {
    const courseRepo = AppDataSource.getRepository(Course);
    const enrollmentRepo = AppDataSource.getRepository(Enrollment);

    const totalCourses = await courseRepo.count();
    const totalEnrollments = await enrollmentRepo.count();

 
    const enrollmentsByCourse = await enrollmentRepo
      .createQueryBuilder("enrollment")
      .leftJoin("enrollment.course", "course")
      .select("course.title", "courseTitle")
      .addSelect("COUNT(enrollment.id)", "count")
      .groupBy("course.id")
      .getRawMany();

  
    const enrollmentsByCategory = await enrollmentRepo
      .createQueryBuilder("enrollment")
      .leftJoin("enrollment.course", "course")
      .select("course.category", "category")
      .addSelect("COUNT(enrollment.id)", "count")
      .groupBy("course.category")
      .getRawMany();

    return {
      totalCourses,
      totalEnrollments,
      enrollmentsByCourse,
      enrollmentsByCategory,
    };
  },
};
