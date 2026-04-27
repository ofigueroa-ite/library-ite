import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "./base.columns";

export class AddedGendersTable1777316092820 implements MigrationInterface {
  name = "AddedGendersTable1777316092820";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "genders",
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
      CREATE UNIQUE INDEX "UQ_genders_name" ON "genders" ("name")
      WHERE "deleted_at" IS NULL
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "UQ_genders_name"
    `);
    await queryRunner.dropTable("genders");
  }
}
