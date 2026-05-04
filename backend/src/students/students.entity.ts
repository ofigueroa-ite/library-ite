import { BaseEntity } from "src/common/entities/base.entity";
import { StudentsDegrees } from "src/students-degrees/students-degrees.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";

@Entity("students")
export class Student extends BaseEntity {
  @Column({
    name: "control_number",
    unique: true,
  })
  controlNumber: string;

  @Column({
    unique: true,
    nullable: true,
  })
  email?: string;

  @Column({
    nullable: true,
  })
  phone?: string;

  @Column({ name: "given_names" })
  @Index("IDX_given_names")
  givenNames: string;

  @Column({ name: "paternal_surname" })
  @Index("IDX_paternal_surname")
  paternalSurname: string;

  @Column({ name: "maternal_surname" })
  @Index("IDX_maternal_surname")
  maternalSurname: string;

  @OneToMany(
    () => StudentsDegrees,
    (sd) => sd.student
  )
  degrees: StudentsDegrees[];
}
