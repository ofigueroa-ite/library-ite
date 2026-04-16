import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "./base.columns";

export class AddedOtpTable1776023298695 implements MigrationInterface {
  name = "AddedOtpTable1776023298695";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "otp",
        columns: [
          ...baseColumns,
          {
            name: "hash",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "expires_at",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "attempts",
            type: "integer",
            isNullable: false,
            default: 0,
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "FK_otp_user_id",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("otp");
  }
}
