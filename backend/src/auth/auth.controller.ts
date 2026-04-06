import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiBearerAuth } from "@nestjs/swagger";
import type { Response } from "express";
import { EnvironmentVariables } from "src/common/interfaces/environment-variables.interface";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { AuthUser } from "./decorators/auth-user.decorator";
import { Public } from "./decorators/public.decorator";
import { AuthLoginDto } from "./dtos/auth-login.dto";
import { AuthVerifyDto } from "./dtos/auth-verify.dto";
import { AuthJwtGuard } from "./guards/auth-jwt.guard";

@Controller("auth")
export class AuthController {
  private readonly authJwtExpiresIn: number;
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
    private readonly usersService: UsersService
  ) {
    this.authJwtExpiresIn = this.configService.get("AUTH_JWT_EXPIRES_IN");
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
      maxAge: this.authJwtExpiresIn * 1000,
    });

    return { accessToken };
  }

  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @Get("me")
  me(@AuthUser() user: User): User {
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @Post("logout")
  async logout(
    @AuthUser() user: User,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    await this.usersService.rotateJwtSecret(user.id);
    res.clearCookie("token");
  }
}
