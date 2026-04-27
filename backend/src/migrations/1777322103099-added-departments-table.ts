import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "./base.columns";

export class AddedDepartmentsTable1777322103099 implements MigrationInterface {
  name = "AddedDepartmentsTable1777322103099";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "departments",
        columns: [
          ...baseColumns,
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_departments_name" ON "departments" ("name")
      WHERE "deleted_at" IS NULL
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "UQ_departments_name"
    `);
    await queryRunner.dropTable("departments");
  }
}
