import { createMongoAbility } from "@casl/ability";
import { createContext, useContext } from "react";
import type { AppAbility } from "./ability";

export const CaslAbilityContext = createContext<AppAbility>(
  createMongoAbility()
);
export const useCaslAbility = () => useContext(CaslAbilityContext);
