import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
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
    const token =
      request.cookies?.token ||
      (request.headers.authorization?.startsWith("Bearer ")
        ? request.headers.authorization.slice(7)
        : null);

    if (!token) {
      throw new UnauthorizedException();
    }

    const decodedToken = this.jwtService.decode(token) as AuthJwtPayload;
    if (!decodedToken) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findByIdOrThrow(decodedToken.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    try {
      this.jwtService.verify(token, { secret: user.jwtSecret });
    } catch {
      throw new UnauthorizedException();
    }

    request.user = user;
    return true;
  }
}
