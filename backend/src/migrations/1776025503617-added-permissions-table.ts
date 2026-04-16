import { CaslAction } from "src/casl/enums/casl-action.enum";
import { CaslSubject } from "src/casl/enums/casl-subject.enum";
import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "./base.columns";

export class AddedPermissionsTable1776025503617 implements MigrationInterface {
  name = "AddedPermissionsTable1776025503617";
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "permissions",
        columns: [
          ...baseColumns,
          {
            name: "action",
            type: "enum",
            isNullable: false,
            enum: Object.values(CaslAction),
            enumName: "casl_action",
          },
          {
            name: "subject",
            type: "enum",
            isNullable: false,
            enum: Object.values(CaslSubject),
            enumName: "casl_subject",
          },
          {
            name: "conditions",
            type: "text",
            isNullable: true,
          },
          {
            name: "fields",
            type: "text",
            isNullable: true,
          },
          {
            name: "inverted",
            type: "boolean",
            isNullable: false,
            default: false,
          },
          {
            name: "role_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "fk_permissions_role",
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            onDelete: "RESTRICT",
          },
        ],
        uniques: [
          {
            name: "unique_role_permission",
            columnNames: ["role_id", "action", "subject"],
          },
        ],
        indices: [
          {
            name: "idx_permissions_role_id",
            columnNames: ["role_id"],
          },
        ],
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("permissions");
    await queryRunner.query(`DROP TYPE IF EXISTS "casl_action"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "casl_subject"`);
  }
}
