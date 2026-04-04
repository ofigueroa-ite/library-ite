import { DataSource } from "typeorm";
import "dotenv/config";
import Joi from "joi";

const envSchema = Joi.object({
  APP_DATABASE_URL: Joi.string().required(),
}).unknown(true);

const { error, value: env } = envSchema.validate(process.env);

if (error) {
  throw new Error(error.message);
}

export default new DataSource({
  type: "better-sqlite3",
  database: env.APP_DATABASE_URL,
  entities: ["src/**/*.entity.{ts,js}"],
  migrations: ["src/migrations/*.{ts,js}"],
});
