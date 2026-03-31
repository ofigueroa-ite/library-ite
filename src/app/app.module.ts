import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import Joi from "joi";
import { AuthModule } from "src/auth/auth.module";
import { OtpModule } from "src/otp/otp.module";
import { RolesModule } from "src/roles/roles.module";
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
        OTP_TTL_MINUTES: Joi.number().integer().required(),
        OTP_CHARSET: Joi.string().token().required(),
        OTP_LENGTH: Joi.number().integer().min(6).required(),
        OTP_MAX_ATTEMPTS: Joi.number().integer().required(),
        SMTP_HOST: Joi.string().required(),
        SMTP_PORT: Joi.number().integer().required(),
        SMTP_USER: Joi.string().required(),
        SMTP_PASSWORD: Joi.string().required(),
        MAILER_FROM: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().integer().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: "better-sqlite3",
      database: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    RolesModule,
    OtpModule,
    AuthModule,
  ],
})
export class AppModule {}
