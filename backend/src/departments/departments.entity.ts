import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, Index } from "typeorm";

@Entity("departments")
@Index("UQ_departments_name", ["name"], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class Department extends BaseEntity {
  @Column({
    nullable: false,
  })
  name: string;
}
