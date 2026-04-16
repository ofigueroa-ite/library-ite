import { DataSource } from "typeorm";
import "dotenv/config";
import Joi from "joi";

const envSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
}).unknown(true);

const { error, value: env } = envSchema.validate(process.env);

if (error) {
  throw new Error(error.message);
}

export default new DataSource({
  type: "postgres",
  host: env.DATABASE_URL,
  port: env.DATABASE_PORT,
  database: env.DATABASE_NAME,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  entities: ["src/**/*.entity.{ts,js}"],
  migrations: ["src/migrations/*.{ts,js}"],
});
