import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { OtpService } from "../otp/otp.service";
import { UsersService } from "../users/users.service";
import { AuthVerifyDto } from "./dtos/auth-verify.dto";

@Injectable()
export class AuthService {
  private readonly otpMaxAttempts: number;
  constructor(
    private readonly usersService: UsersService,
    private readonly otpService: OtpService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {
    this.otpMaxAttempts = this.configService.get<number>("OTP_MAX_ATTEMPTS", {
      infer: true,
    });
  }

  async login(email: string): Promise<void> {
    const user = await this.usersService.findByEmailOrThrow(email);
    await this.otpService.create({ userId: user.id });
  }

  async verify(dto: AuthVerifyDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmailOrThrow(dto.email);
    const otp = await this.otpService.findByUserIdOrThrow(user.id);

    if (otp.attempts >= this.otpMaxAttempts) {
      await this.otpService.delete(otp.id);
      throw new UnauthorizedException();
    }

    if (otp.expiresAt < new Date()) {
      await this.otpService.delete(otp.id);
      throw new UnauthorizedException();
    }

    const codesMatch = await compare(dto.otp, otp.hash);
    if (!codesMatch) {
      otp.attempts += 1;
      await this.otpService.update(otp.id, { attempts: otp.attempts });
      throw new UnauthorizedException();
    }

    await this.otpService.delete(otp.id);

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: user.jwtSecret,
    });
    return { accessToken };
  }
}
