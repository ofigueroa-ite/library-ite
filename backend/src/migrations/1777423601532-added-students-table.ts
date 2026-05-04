import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";
import { baseColumns } from "./base.columns";

export class AddedStudentsTable1777423601532 implements MigrationInterface {
  name = "AddedStudentsTable1777423601532";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "students",
        columns: [
          ...baseColumns,
          {
            name: "control_number",
            isUnique: true,
            type: "varchar",
            isNullable: false,
          },
          {
            name: "email",
            isUnique: true,
            isNullable: true,
            type: "varchar",
          },
          {
            name: "phone",
            isNullable: true,
            type: "varchar",
          },
          {
            name: "given_names",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "paternal_surname",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "maternal_surname",
            isNullable: false,
            type: "varchar",
          },
        ],
      })
    );

    await queryRunner.createIndex(
      "students",
      new TableIndex({
        name: "IDX_given_names",
        columnNames: ["given_names"],
      })
    );

    await queryRunner.createIndex(
      "students",
      new TableIndex({
        name: "IDX_paternal_surname",
        columnNames: ["paternal_surname"],
      })
    );

    await queryRunner.createIndex(
      "students",
      new TableIndex({
        name: "IDX_maternal_surname",
        columnNames: ["maternal_surname"],
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("students", "IDX_given_names");
    await queryRunner.dropIndex("students", "IDX_paternal_surname");
    await queryRunner.dropIndex("students", "IDX_maternal_surname");
    await queryRunner.dropTable("students");
  }
}
