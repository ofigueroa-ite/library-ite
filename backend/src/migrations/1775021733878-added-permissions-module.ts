import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPermissionsModule1775021733878 implements MigrationInterface {
  name = "AddedPermissionsModule1775021733878";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "action" varchar CHECK( "action" IN ('manage','create','read','update','delete') ) NOT NULL, "subject" varchar CHECK( "subject" IN ('all','otp','permissions','roles','users') ), "conditions" text, "fields" text, "inverted" boolean NOT NULL DEFAULT (0), "role_id" varchar NOT NULL, CONSTRAINT "UQ_af6ab46bfc325cb7177ddb5752a" UNIQUE ("action", "subject", "role_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f10931e7bb05a3b434642ed279" ON "permissions" ("role_id") `
    );
    await queryRunner.query(`DROP INDEX "IDX_f10931e7bb05a3b434642ed279"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_permissions" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "action" varchar CHECK( "action" IN ('manage','create','read','update','delete') ) NOT NULL, "subject" varchar CHECK( "subject" IN ('all','otp','permissions','roles','users') ), "conditions" text, "fields" text, "inverted" boolean NOT NULL DEFAULT (0), "role_id" varchar NOT NULL, CONSTRAINT "UQ_af6ab46bfc325cb7177ddb5752a" UNIQUE ("action", "subject", "role_id"), CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_permissions"("id", "createdAt", "updatedAt", "deletedAt", "action", "subject", "conditions", "fields", "inverted", "role_id") SELECT "id", "createdAt", "updatedAt", "deletedAt", "action", "subject", "conditions", "fields", "inverted", "role_id" FROM "permissions"`
    );
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_permissions" RENAME TO "permissions"`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f10931e7bb05a3b434642ed279" ON "permissions" ("role_id") `
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_f10931e7bb05a3b434642ed279"`);
    await queryRunner.query(
      `ALTER TABLE "permissions" RENAME TO "temporary_permissions"`
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "action" varchar CHECK( "action" IN ('manage','create','read','update','delete') ) NOT NULL, "subject" varchar CHECK( "subject" IN ('all','otp','permissions','roles','users') ), "conditions" text, "fields" text, "inverted" boolean NOT NULL DEFAULT (0), "role_id" varchar NOT NULL, CONSTRAINT "UQ_af6ab46bfc325cb7177ddb5752a" UNIQUE ("action", "subject", "role_id"))`
    );
    await queryRunner.query(
      `INSERT INTO "permissions"("id", "createdAt", "updatedAt", "deletedAt", "action", "subject", "conditions", "fields", "inverted", "role_id") SELECT "id", "createdAt", "updatedAt", "deletedAt", "action", "subject", "conditions", "fields", "inverted", "role_id" FROM "temporary_permissions"`
    );
    await queryRunner.query(`DROP TABLE "temporary_permissions"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_f10931e7bb05a3b434642ed279" ON "permissions" ("role_id") `
    );
    await queryRunner.query(`DROP INDEX "IDX_f10931e7bb05a3b434642ed279"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
  }
}
