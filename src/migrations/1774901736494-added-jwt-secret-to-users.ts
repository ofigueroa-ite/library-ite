import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedJwtSecretToUsers1774901736494 implements MigrationInterface {
  name = "AddedJwtSecretToUsers1774901736494";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "name" varchar NOT NULL, "surname" varchar NOT NULL, "email" varchar NOT NULL, "jwt_secret" varchar NOT NULL DEFAULT (lower(hex(randomblob(32)))), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_users"("id", "createdAt", "updatedAt", "deletedAt", "name", "surname", "email") SELECT "id", "createdAt", "updatedAt", "deletedAt", "name", "surname", "email" FROM "users"`
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "name" varchar NOT NULL, "surname" varchar NOT NULL, "email" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "users"("id", "createdAt", "updatedAt", "deletedAt", "name", "surname", "email") SELECT "id", "createdAt", "updatedAt", "deletedAt", "name", "surname", "email" FROM "temporary_users"`
    );
    await queryRunner.query(`DROP TABLE "temporary_users"`);
  }
}
