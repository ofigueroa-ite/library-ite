import { BaseEntity } from "src/common/entities/base";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Otp extends BaseEntity {
  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  expiresAt: Date;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
