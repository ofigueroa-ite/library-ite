import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { OtpController } from "./otp.controller";
import { Otp } from "./otp.entity";
import { OtpService } from "./otp.service";

@Module({
  imports: [TypeOrmModule.forFeature([Otp]), UsersModule],
  providers: [OtpService],
  controllers: [OtpController],
})
export class OtpModule {}
