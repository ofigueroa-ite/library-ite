import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "./base.columns";

export class AddedDegreesTable1777319133573 implements MigrationInterface {
  name = "AddedDegreesTable1777319133573";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "degrees",
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
      CREATE UNIQUE INDEX "UQ_degrees_name" ON "degrees" ("name")
      WHERE "deleted_at" IS NULL
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "UQ_degrees_name"
    `);
    await queryRunner.dropTable("degrees");
  }
}
