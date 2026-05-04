import { BaseEntity } from "src/common/entities/base.entity";
import { StudentsDegrees } from "src/students-degrees/students-degrees.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";

@Entity("degrees")
@Index("UQ_degrees_name", ["name"], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class Degree extends BaseEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @OneToMany(
    () => StudentsDegrees,
    (sd) => sd.degree
  )
  students: StudentsDegrees[];
}
