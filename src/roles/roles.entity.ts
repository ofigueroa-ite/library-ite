import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity("roles")
export class Role extends BaseEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  name: string;
}
