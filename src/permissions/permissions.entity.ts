import { CaslAction } from "src/common/enums/casl-action.enum";
import { CaslSubject } from "src/common/enums/casl-subject.enum";
import { Role } from "src/roles/roles.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity";

@Entity("permissions")
@Unique(["action", "subject", "roleId"])
export class Permission extends BaseEntity {
  @Column({ type: "simple-enum", enum: CaslAction, nullable: false })
  action: CaslAction;

  @Column({ type: "simple-enum", enum: CaslSubject, nullable: true })
  subject?: CaslSubject;

  @Column({ type: "simple-json", nullable: true })
  conditions?: Record<string, unknown>;

  @Column({ type: "simple-array", nullable: true })
  fields?: string[];

  @Column({ default: false })
  inverted: boolean;

  @Index()
  @Column({
    name: "role_id",
    nullable: false,
  })
  roleId: string;

  @ManyToOne(
    () => Role,
    (role) => role.permissions,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({
    name: "role_id",
    referencedColumnName: "id",
  })
  role: Role;
}
