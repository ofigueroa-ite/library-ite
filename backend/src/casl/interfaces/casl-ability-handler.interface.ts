import { CaslUserAbility } from "./casl-user-ability.interface";

interface ICaslAbilityHandler {
  handle(ability: CaslUserAbility): boolean;
}

type CaslAbilityHandlerCallback = (ability: CaslUserAbility) => boolean;

export type CaslAbilityHandler =
  | ICaslAbilityHandler
  | CaslAbilityHandlerCallback;
