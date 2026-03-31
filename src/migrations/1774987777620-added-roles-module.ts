import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRolesModule1774987777620 implements MigrationInterface {
  name = "AddedRolesModule1774987777620";

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "name" varchar NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles" ("user_id" varchar NOT NULL, "role_id" varchar NOT NULL, PRIMARY KEY ("user_id", "role_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles" ("role_id") `
    );
    await queryRunner.query(`DROP INDEX "IDX_e4435209df12bc1f001e536017"`);
    await queryRunner.query(`DROP INDEX "IDX_1cf664021f00b9cc1ff95e17de"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_users_roles" ("user_id" varchar NOT NULL, "role_id" varchar NOT NULL, CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("user_id", "role_id"))`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_users_roles"("user_id", "role_id") SELECT "user_id", "role_id" FROM "users_roles"`
    );
    await queryRunner.query(`DROP TABLE "users_roles"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_users_roles" RENAME TO "users_roles"`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles" ("role_id") `
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_1cf664021f00b9cc1ff95e17de"`);
    await queryRunner.query(`DROP INDEX "IDX_e4435209df12bc1f001e536017"`);
    await queryRunner.query(
      `ALTER TABLE "users_roles" RENAME TO "temporary_users_roles"`
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles" ("user_id" varchar NOT NULL, "role_id" varchar NOT NULL, PRIMARY KEY ("user_id", "role_id"))`
    );
    await queryRunner.query(
      `INSERT INTO "users_roles"("user_id", "role_id") SELECT "user_id", "role_id" FROM "temporary_users_roles"`
    );
    await queryRunner.query(`DROP TABLE "temporary_users_roles"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles" ("role_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id") `
    );
    await queryRunner.query(`DROP INDEX "IDX_1cf664021f00b9cc1ff95e17de"`);
    await queryRunner.query(`DROP INDEX "IDX_e4435209df12bc1f001e536017"`);
    await queryRunner.query(`DROP TABLE "users_roles"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
