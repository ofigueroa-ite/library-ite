import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, Index } from "typeorm";

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
}
