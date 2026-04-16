import { BaseEntity } from "src/common/entities/base.entity";
import { Permission } from "src/permissions/permissions.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity("roles")
export class Role extends BaseEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Column({ nullable: false, unique: true })
  priority: number;

  @OneToMany(
    () => Permission,
    (permission) => permission.role
  )
  permissions: Permission[];

  @ManyToMany(
    () => User,
    (user) => user.roles
  )
  users: User[];
}
