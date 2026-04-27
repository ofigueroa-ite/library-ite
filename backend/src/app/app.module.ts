import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import Joi from "joi";
import { AuthModule } from "src/auth/auth.module";
import { AuthJwtGuard } from "src/auth/guards/auth-jwt.guard";
import { CaslModule } from "src/casl/casl.module";
import { CaslAbilitiesGuard } from "src/casl/guards/casl-abilities.guard";
import { EnvironmentVariables } from "src/common/interfaces/environment-variables.interface";
import { DegreesModule } from "src/degrees/degrees.module";
import { DepartmentsModule } from "src/departments/departments.module";
import { GendersModule } from "src/genders/genders.module";
import { OtpModule } from "src/otp/otp.module";
import { PermissionsModule } from "src/permissions/permissions.module";
import { RolesModule } from "src/roles/roles.module";
import { SeederModule } from "src/seeder/seeder.module";
import { UsersModule } from "src/users/users.module";
import { UsersRolesModule } from "src/users-roles/users-roles.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_VERSION: Joi.string()
          .pattern(/^\d+\.\d+\.\d+$/)
          .required(),
        APP_CORS_ORIGINS: Joi.string()
          .custom((value: string, helpers) => {
            const urls = value.split(",").map((url) => url.trim());
            const urlSchema = Joi.string().uri();

            for (const url of urls) {
              const { error } = urlSchema.validate(url);
              if (error) {
                return helpers.error(
                  "APP_CORS_ORIGINS must be a comma separated URL list"
                );
              }
            }

            return urls;
          })
          .required(),
        DATABASE_URL: Joi.string().required(),
        DATABASE_PORT: Joi.number().integer().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        AUTH_JWT_EXPIRES_IN: Joi.number().integer().required(),
        MAILER_SMTP_HOST: Joi.string().required(),
        MAILER_SMTP_PORT: Joi.number().integer().required(),
        MAILER_SMTP_USER: Joi.string().required(),
        MAILER_SMTP_PASSWORD: Joi.string().required(),
        MAILER_FROM: Joi.string().required(),
        OTP_TTL_MINUTES: Joi.number().integer().required(),
        OTP_CHARSET: Joi.string().token().required(),
        OTP_LENGTH: Joi.number().integer().min(6).required(),
        OTP_MAX_ATTEMPTS: Joi.number().integer().required(),
        SEEDER_SUPER_ADMIN_EMAIL: Joi.string().email().required(),
        SEEDER_SUPER_ADMIN_ROLE_NAME: Joi.string().required(),
        SEEDER_SUPER_ADMIN_NAME: Joi.string().required(),
        SEEDER_SUPER_ADMIN_SURNAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<EnvironmentVariables, true>
      ) => ({
        type: "postgres",
        host: configService.get("DATABASE_URL", { infer: true }),
        port: configService.get("DATABASE_PORT", { infer: true }),
        database: configService.get("DATABASE_NAME", { infer: true }),
        username: configService.get("DATABASE_USERNAME", { infer: true }),
        password: configService.get("DATABASE_PASSWORD", { infer: true }),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    UsersModule,
    RolesModule,
    UsersRolesModule,
    PermissionsModule,
    OtpModule,
    AuthModule,
    CaslModule,
    SeederModule,
    GendersModule,
    DegreesModule,
    DepartmentsModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthJwtGuard },
    { provide: APP_GUARD, useClass: CaslAbilitiesGuard },
  ],
})
export class AppModule {}
