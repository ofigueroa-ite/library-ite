import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "./base.columns";

export class AddedRolesTable1776024993152 implements MigrationInterface {
  name = "AddedRolesTable1776024993152";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "roles",
        columns: [
          ...baseColumns,
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "priority",
            type: "integer",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_roles_name" ON "roles" ("name")
      WHERE "deleted_at" IS NULL
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_roles_priority" ON "roles" ("priority")
      WHERE "deleted_at" IS NULL
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "UQ_roles_name"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "UQ_roles_priority"
    `);
    await queryRunner.dropTable("roles");
  }
}
