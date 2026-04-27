import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, Index } from "typeorm";

@Entity("genders")
@Index("UQ_genders_name", ["name"], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class Gender extends BaseEntity {
  @Column({
    nullable: false,
  })
  name: string;
}
