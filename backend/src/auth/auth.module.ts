import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { EnvironmentVariables } from "src/common/interfaces/environment-variables.interface";
import { OtpModule } from "src/otp/otp.module";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthJwtGuard } from "./guards/auth-jwt.guard";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables, true>
      ) => ({
        secret: configService.get<string>("JWT_SECRET", { infer: true }),
        signOptions: {
          expiresIn: `${configService.get<number>("AUTH_JWT_EXPIRES_IN", { infer: true })}s`,
        },
      }),
      global: true,
    }),
    UsersModule,
    OtpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthJwtGuard],
  exports: [AuthService, AuthJwtGuard],
})
export class AuthModule {}
