import { AbilityBuilder, createMongoAbility, MongoQuery } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/users.entity";
import { CaslUserAbility } from "./interfaces/casl-user-ability.interface";

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): CaslUserAbility {
    const { can, cannot, build } = new AbilityBuilder<CaslUserAbility>(
      createMongoAbility
    );

    const sortedRoles = user.roles.toSorted((a, b) => a.priority - b.priority);
    const permissions = sortedRoles.flatMap((role) => role.permissions);

    for (const permission of permissions) {
      if (permission.inverted) {
        cannot(
          permission.action,
          permission.subject,
          permission.conditions as MongoQuery<never>
        );
      } else {
        can(
          permission.action,
          permission.subject,
          permission.conditions as MongoQuery<never>
        );
      }
    }

    return build();
  }
}
