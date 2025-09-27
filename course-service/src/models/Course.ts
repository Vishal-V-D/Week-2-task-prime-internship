import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Enrollment } from "./Enrollment";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  duration!: number; 

  @Column({ default: "general" })
  category!: string;

  @Column({ type: "float", default: 0 })
  rating!: number;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments!: Enrollment[];
}
