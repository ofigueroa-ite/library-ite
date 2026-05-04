import { BaseEntity } from "src/common/entities/base.entity";
import { Degree } from "src/degrees/degrees.entity";
import { Student } from "src/students/students.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

@Entity("students_degrees")
@Index("UQ_students_degrees_student_id", ["studentId"], {
  unique: true,
  where: "deleted_at IS NULL",
})
export class StudentsDegrees extends BaseEntity {
  @Column({ name: "student_id", type: "uuid", nullable: false })
  studentId: string;

  @Column({ name: "degree_id", type: "uuid", nullable: false })
  degreeId: string;

  @ManyToOne(() => Student, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "student_id", referencedColumnName: "id" })
  student: Student;

  @ManyToOne(() => Degree, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "degree_id", referencedColumnName: "id" })
  degree: Degree;
}
