import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { User } from "src/users/users.entity";
import { AuthService } from "./auth.service";
import { AuthUser } from "./decorators/auth-user.decorator";
import { AuthLoginDto } from "./dtos/auth-login.dto";
import { AuthVerifyDto } from "./dtos/auth-verify.dto";
import { AuthJwtGuard } from "./guards/auth-jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() dto: AuthLoginDto): Promise<void> {
    await this.authService.login(dto.email);
  }

  @Post("verify")
  verify(@Body() dto: AuthVerifyDto): Promise<{ accessToken: string }> {
    return this.authService.verify(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @Get("me")
  me(@AuthUser() user: User): User {
    return user;
  }
}
