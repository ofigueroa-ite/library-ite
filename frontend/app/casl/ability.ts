import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
} from "@casl/ability";
import { User } from "../(admin)/users/interfaces/user.interface";
import { CaslAction } from "./interfaces/casl-action.enum";
import { CaslSubject } from "./interfaces/casl-subject.enum";

export type AppAbility = MongoAbility<[CaslAction, CaslSubject]>;

export function defineAbilityFor(user: User): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createMongoAbility
  );

  const sortedRoles = user.roles.toSorted((a, b) => a.priority - b.priority);
  const permissions = sortedRoles.flatMap((role) => role.permissions);

  for (const permission of permissions) {
    if (permission.inverted) {
      cannot(permission.action, permission.subject, permission.conditions);
    } else {
      can(permission.action, permission.subject, permission.conditions);
    }
  }

  return build();
}
