import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: "now()",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: "now()",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    type: "timestamp",
    nullable: true,
  })
  deletedAt: Date | null;
}
