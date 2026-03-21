import { BaseEntity } from "src/common/entities/base.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Otp extends BaseEntity {
  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  expiresAt: Date;

  @Column({ name: "user_id", type: "uuid", nullable: false })
  userId: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
