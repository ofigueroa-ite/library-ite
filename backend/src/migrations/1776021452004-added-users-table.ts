import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "./base.columns";

export class AddedUsersTable1776021452004 implements MigrationInterface {
  name = "AddedUsersTable1776021452004";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          ...baseColumns,
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "surname",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "jwt_secret",
            type: "varchar",
            isNullable: false,
            default: "encode(gen_random_bytes(32), 'hex')",
          },
        ],
        uniques: [
          {
            name: "unique_email",
            columnNames: ["email"],
          },
        ],
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
