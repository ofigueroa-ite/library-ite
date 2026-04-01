import { BaseEntity } from "src/common/entities/base.entity";
import { Permission } from "src/permissions/permissions.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("roles")
export class Role extends BaseEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(
    () => Permission,
    (permission) => permission.role
  )
  permissions: Permission[];
}
