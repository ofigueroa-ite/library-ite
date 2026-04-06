import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { UsersService } from "src/users/users.service";
import { IS_PUBLIC } from "../decorators/public.decorator";
import { AuthJwtPayload } from "../interfaces/auth-jwt-payload.interface";

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();

    const token =
      request.cookies?.token ||
      (request.headers.authorization?.startsWith("Bearer ")
        ? request.headers.authorization.slice(7)
        : null);

    if (!token) {
      this.clearCookieAndThrow(response);
    }

    const decodedToken = this.jwtService.decode(token) as AuthJwtPayload;
    if (!decodedToken) {
      this.clearCookieAndThrow(response);
    }

    const user = await this.usersService.findById(decodedToken.sub);
    if (!user) {
      this.clearCookieAndThrow(response);
    }

    try {
      this.jwtService.verify(token, { secret: user.jwtSecret });
    } catch {
      this.clearCookieAndThrow(response);
    }

    request.user = user;
    return true;
  }

  private clearCookieAndThrow(response: Response): never {
    response.clearCookie("token");
    throw new UnauthorizedException();
  }
}
