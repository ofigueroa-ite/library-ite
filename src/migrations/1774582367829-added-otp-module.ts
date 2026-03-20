import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedOtpModule1774582367829 implements MigrationInterface {
  name = "AddedOtpModule1774582367829";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "otp" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "hash" varchar NOT NULL, "expiresAt" datetime NOT NULL, "attempts" integer NOT NULL DEFAULT (0), "user_id" varchar NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_otp" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "hash" varchar NOT NULL, "expiresAt" datetime NOT NULL, "attempts" integer NOT NULL DEFAULT (0), "user_id" varchar NOT NULL, CONSTRAINT "FK_258d028d322ea3b856bf9f12f25" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_otp"("id", "createdAt", "updatedAt", "deletedAt", "hash", "expiresAt", "attempts", "user_id") SELECT "id", "createdAt", "updatedAt", "deletedAt", "hash", "expiresAt", "attempts", "user_id" FROM "otp"`
    );
    await queryRunner.query(`DROP TABLE "otp"`);
    await queryRunner.query(`ALTER TABLE "temporary_otp" RENAME TO "otp"`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "otp" RENAME TO "temporary_otp"`);
    await queryRunner.query(
      `CREATE TABLE "otp" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "hash" varchar NOT NULL, "expiresAt" datetime NOT NULL, "attempts" integer NOT NULL DEFAULT (0), "user_id" varchar NOT NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "otp"("id", "createdAt", "updatedAt", "deletedAt", "hash", "expiresAt", "attempts", "user_id") SELECT "id", "createdAt", "updatedAt", "deletedAt", "hash", "expiresAt", "attempts", "user_id" FROM "temporary_otp"`
    );
    await queryRunner.query(`DROP TABLE "temporary_otp"`);
    await queryRunner.query(`DROP TABLE "otp"`);
  }
}
