import { BaseEntity } from "src/common/entities/base.entity";
import { Role } from "src/roles/roles.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("users_roles")
export class UsersRoles extends BaseEntity {
  @Column({ name: "user_id", nullable: false, type: "uuid" })
  userId: string;

  @Column({ name: "role_id", nullable: false, type: "uuid" })
  roleId: string;

  @ManyToOne(() => User, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Role, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "role_id" })
  role: Role;
}
