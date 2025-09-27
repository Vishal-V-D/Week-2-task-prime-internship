import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Course } from "./Course";

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  studentName!: string;

  @Column()
  studentEmail!: string;

  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: "CASCADE" })
  course!: Course;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
