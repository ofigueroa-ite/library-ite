import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailerModule } from "src/mailer/mailer.module";
import { UsersModule } from "src/users/users.module";
import { OtpController } from "./otp.controller";
import { Otp } from "./otp.entity";
import { OtpService } from "./otp.service";

@Module({
  imports: [TypeOrmModule.forFeature([Otp]), UsersModule, MailerModule],
  providers: [OtpService],
  controllers: [OtpController],
  exports: [OtpService],
})
export class OtpModule {}
