import { DataSource } from "typeorm";
import "dotenv/config";

export default new DataSource({
  type: "better-sqlite3",
  database: process.env.DATABASE_URL || "local.db",
  entities: ["src/**/*.entity.{ts,js}"],
  migrations: ["src/migrations/*.{ts,js}"],
});
