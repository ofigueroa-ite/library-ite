import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPriorityToRoles1775067567440 implements MigrationInterface {
  name = "AddedPriorityToRoles1775067567440";

  async up(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(
      `CREATE TABLE "temporary_roles" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "name" varchar NOT NULL, "priority" integer NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "UQ_934f76a5e05f841048718796e8b" UNIQUE ("priority"))`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_roles"("id", "createdAt", "updatedAt", "deletedAt", "name") SELECT "id", "createdAt", "updatedAt", "deletedAt", "name" FROM "roles"`
    );
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`ALTER TABLE "temporary_roles" RENAME TO "roles"`);
    await queryRunner.query(`DROP INDEX "IDX_f10931e7bb05a3b434642ed279"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_permissions" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "action" varchar CHECK( "action" IN ('manage','create','read','update','delete') ) NOT NULL, "subject" varchar CHECK( "subject" IN ('all','otp','permissions','roles','users') ), "conditions" text, "fields" text, "inverted" boolean NOT NULL DEFAULT (0), "role_id" varchar NOT NULL, CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
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
    await queryRunner.query(`DROP INDEX "IDX_f10931e7bb05a3b434642ed279"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_permissions" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "action" varchar CHECK( "action" IN ('manage','create','read','update','delete') ) NOT NULL, "subject" varchar CHECK( "subject" IN ('all','otp','permissions','roles','users') ) NOT NULL, "conditions" text, "fields" text, "inverted" boolean NOT NULL DEFAULT (0), "role_id" varchar NOT NULL, CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
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
    await queryRunner.query(`DROP INDEX "IDX_f10931e7bb05a3b434642ed279"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_permissions" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "action" varchar CHECK( "action" IN ('manage','create','read','update','delete') ) NOT NULL, "subject" varchar CHECK( "subject" IN ('all','otp','permissions','roles','users') ) NOT NULL, "conditions" text, "fields" text, "inverted" boolean NOT NULL DEFAULT (0), "role_id" varchar NOT NULL, CONSTRAINT "UQ_af6ab46bfc325cb7177ddb5752a" UNIQUE ("action", "subject", "role_id"), CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
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
      `CREATE TABLE "permissions" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "action" varchar CHECK( "action" IN ('manage','create','read','update','delete') ) NOT NULL, "subject" varchar CHECK( "subject" IN ('all','otp','permissions','roles','users') ) NOT NULL, "conditions" text, "fields" text, "inverted" boolean NOT NULL DEFAULT (0), "role_id" varchar NOT NULL, CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "permissions"("id", "createdAt", "updatedAt", "deletedAt", "action", "subject", "conditions", "fields", "inverted", "role_id") SELECT "id", "createdAt", "updatedAt", "deletedAt", "action", "subject", "conditions", "fields", "inverted", "role_id" FROM "temporary_permissions"`
    );
    await queryRunner.query(`DROP TABLE "temporary_permissions"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_f10931e7bb05a3b434642ed279" ON "permissions" ("role_id") `
    );
    await queryRunner.query(`DROP INDEX "IDX_f10931e7bb05a3b434642ed279"`);
    await queryRunner.query(
      `ALTER TABLE "permissions" RENAME TO "temporary_permissions"`
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "action" varchar CHECK( "action" IN ('manage','create','read','update','delete') ) NOT NULL, "subject" varchar CHECK( "subject" IN ('all','otp','permissions','roles','users') ), "conditions" text, "fields" text, "inverted" boolean NOT NULL DEFAULT (0), "role_id" varchar NOT NULL, CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "permissions"("id", "createdAt", "updatedAt", "deletedAt", "action", "subject", "conditions", "fields", "inverted", "role_id") SELECT "id", "createdAt", "updatedAt", "deletedAt", "action", "subject", "conditions", "fields", "inverted", "role_id" FROM "temporary_permissions"`
    );
    await queryRunner.query(`DROP TABLE "temporary_permissions"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_f10931e7bb05a3b434642ed279" ON "permissions" ("role_id") `
    );
    await queryRunner.query(`DROP INDEX "IDX_f10931e7bb05a3b434642ed279"`);
    await queryRunner.query(
      `ALTER TABLE "permissions" RENAME TO "temporary_permissions"`
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "action" varchar CHECK( "action" IN ('manage','create','read','update','delete') ) NOT NULL, "subject" varchar CHECK( "subject" IN ('all','otp','permissions','roles','users') ), "conditions" text, "fields" text, "inverted" boolean NOT NULL DEFAULT (0), "role_id" varchar NOT NULL, CONSTRAINT "UQ_af6ab46bfc325cb7177ddb5752a" UNIQUE ("action", "subject", "role_id"), CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "permissions"("id", "createdAt", "updatedAt", "deletedAt", "action", "subject", "conditions", "fields", "inverted", "role_id") SELECT "id", "createdAt", "updatedAt", "deletedAt", "action", "subject", "conditions", "fields", "inverted", "role_id" FROM "temporary_permissions"`
    );
    await queryRunner.query(`DROP TABLE "temporary_permissions"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_f10931e7bb05a3b434642ed279" ON "permissions" ("role_id") `
    );
    await queryRunner.query(`ALTER TABLE "roles" RENAME TO "temporary_roles"`);
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "name" varchar NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"))`
    );
    await queryRunner.query(
      `INSERT INTO "roles"("id", "createdAt", "updatedAt", "deletedAt", "name") SELECT "id", "createdAt", "updatedAt", "deletedAt", "name" FROM "temporary_roles"`
    );
    await queryRunner.query(`DROP TABLE "temporary_roles"`);
    await queryRunner.query(`DROP INDEX "IDX_f10931e7bb05a3b434642ed279"`);
    await queryRunner.query(
      `ALTER TABLE "permissions" RENAME TO "temporary_permissions"`
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "action" varchar CHECK( "action" IN ('manage','create','read','update','delete') ) NOT NULL, "subject" varchar CHECK( "subject" IN ('all','otp','permissions','roles','users') ), "conditions" text, "fields" text, "inverted" boolean NOT NULL DEFAULT (0), "role_id" varchar NOT NULL, CONSTRAINT "UQ_af6ab46bfc325cb7177ddb5752a" UNIQUE ("action", "subject", "role_id"), CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "permissions"("id", "createdAt", "updatedAt", "deletedAt", "action", "subject", "conditions", "fields", "inverted", "role_id") SELECT "id", "createdAt", "updatedAt", "deletedAt", "action", "subject", "conditions", "fields", "inverted", "role_id" FROM "temporary_permissions"`
    );
    await queryRunner.query(`DROP TABLE "temporary_permissions"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_f10931e7bb05a3b434642ed279" ON "permissions" ("role_id") `
    );
  }
}
