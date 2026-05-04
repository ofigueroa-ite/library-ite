import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "./base.columns";

export class AddedStudentsDegreesTable1777930356617
  implements MigrationInterface
{
  name = "AddedStudentsDegreesTable1777930356617";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "students_degrees",
        columns: [
          ...baseColumns,
          {
            name: "student_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "degree_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "FK_students_degrees_student_id",
            columnNames: ["student_id"],
            referencedTableName: "students",
            referencedColumnNames: ["id"],
            onDelete: "RESTRICT",
          },
          {
            name: "FK_students_degrees_degree_id",
            columnNames: ["degree_id"],
            referencedTableName: "degrees",
            referencedColumnNames: ["id"],
            onDelete: "RESTRICT",
          },
        ],
        indices: [
          {
            name: "IDX_students_degrees_student_id",
            columnNames: ["student_id"],
          },
          {
            name: "IDX_students_degrees_degree_id",
            columnNames: ["degree_id"],
          },
          {
            name: "UQ_students_degrees_student_id",
            columnNames: ["student_id"],
            isUnique: true,
            where: "deleted_at IS NULL",
          },
        ],
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("students_degrees");
  }
}
