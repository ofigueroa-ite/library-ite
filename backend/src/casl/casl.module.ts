import { Global, Module } from "@nestjs/common";
import { CaslAbilityFactory } from "./casl-ability.factory";
import { CaslAbilitiesGuard } from "./guards/casl-abilities.guard";

@Global()
@Module({
  providers: [CaslAbilityFactory, CaslAbilitiesGuard],
  exports: [CaslAbilityFactory, CaslAbilitiesGuard],
})
export class CaslModule {}
