import { Exclude } from "class-transformer";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

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
}
