import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "./base.columns";

export class AddedUsersRolesTable1776027081471 implements MigrationInterface {
  name = "AddedUsersRolesTable1776027081471";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_roles",
        columns: [
          ...baseColumns,
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "role_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        uniques: [
          {
            name: "UQ_users_roles_user_id_role_id",
            columnNames: ["user_id", "role_id"],
          },
        ],
        foreignKeys: [
          {
            name: "FK_users_roles_user_id",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "RESTRICT",
          },
          {
            name: "FK_users_roles_role_id",
            columnNames: ["role_id"],
            referencedTableName: "roles",
            referencedColumnNames: ["id"],
            onDelete: "RESTRICT",
          },
        ],
        indices: [
          {
            name: "IDX_users_roles_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_users_roles_role_id",
            columnNames: ["role_id"],
          },
        ],
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_roles");
  }
}
