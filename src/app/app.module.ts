import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import Joi from "joi";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        VERSION: Joi.string()
          .pattern(/^\d+\.\d+\.\d+$/)
          .required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: "better-sqlite3",
      database: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
  ],
})
export class AppModule {}
