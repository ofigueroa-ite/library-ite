import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiBearerAuth } from "@nestjs/swagger";
import type { Response } from "express";
import { EnvironmentVariables } from "src/common/interfaces/environment-variables.interface";
import { User } from "src/users/users.entity";
import { AuthService } from "./auth.service";
import { AuthUser } from "./decorators/auth-user.decorator";
import { Public } from "./decorators/public.decorator";
import { AuthLoginDto } from "./dtos/auth-login.dto";
import { AuthVerifyDto } from "./dtos/auth-verify.dto";
import { AuthJwtGuard } from "./guards/auth-jwt.guard";

@Controller("auth")
export class AuthController {
  private readonly otpTtl: number;
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<EnvironmentVariables, true>
  ) {
    this.otpTtl = this.configService.get("OTP_TTL_MINUTES");
  }

  @Public()
  @Post("login")
  async login(@Body() dto: AuthLoginDto): Promise<void> {
    await this.authService.login(dto.email);
  }

  @Public()
  @Post("verify")
  async verify(
    @Body() dto: AuthVerifyDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ accessToken: string }> {
    const { accessToken } = await this.authService.verify(dto);

    res.cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: this.otpTtl * 1000,
    });

    return { accessToken };
  }

  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @Get("me")
  me(@AuthUser() user: User): User {
    return user;
  }
}
