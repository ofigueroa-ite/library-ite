import { BaseEntity } from "src/common/entities/base.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("otp")
export class Otp extends BaseEntity {
  @Column({ nullable: false })
  hash: string;

  @Column({ name: "expires_at", nullable: false })
  expiresAt: Date;

  @Column({ nullable: false, default: 0 })
  attempts: number;

  @Column({ name: "user_id", type: "uuid", nullable: false })
  userId: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
