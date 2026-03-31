import { Exclude } from "class-transformer";
import { BaseEntity } from "src/common/entities/base.entity";
import { Role } from "src/roles/roles.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  surname: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({
    name: "jwt_secret",
    nullable: false,
    default: () => "lower(hex(randomblob(32)))",
  })
  jwtSecret: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: "users_roles",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
  })
  roles: Role[];
}
