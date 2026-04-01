import { SetMetadata } from "@nestjs/common";
import { CaslAbilityHandler } from "../interfaces/casl-ability-handler.interface";

export const CHECK_ABILITIES_KEY = "check_abilities_key";
export const CheckAbilities = (...handlers: CaslAbilityHandler[]) =>
  SetMetadata(CHECK_ABILITIES_KEY, handlers);
