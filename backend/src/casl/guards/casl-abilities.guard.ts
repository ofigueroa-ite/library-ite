import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CaslAbilityFactory } from "../casl-ability.factory";
import { CHECK_ABILITIES_KEY } from "../decorators/casl-check-abilites.decorator";
import { CaslAbilityHandler } from "../interfaces/casl-ability-handler.interface";
import { CaslUserAbility } from "../interfaces/casl-user-ability.interface";

@Injectable()
export class CaslAbilitiesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const abilityHandlers =
      this.reflector.get<CaslAbilityHandler[]>(
        CHECK_ABILITIES_KEY,
        context.getHandler()
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);

    return abilityHandlers.every((handler) =>
      this.execAbilityHandler(handler, ability)
    );
  }

  private execAbilityHandler(
    handler: CaslAbilityHandler,
    ability: CaslUserAbility
  ) {
    if (typeof handler === "function") {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
