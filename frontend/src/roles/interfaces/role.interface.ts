import type { Resource } from "../../common/interfaces/resource";
import type { Permissions } from "../../permissions/interfaces/permissions.interface";
import type { User } from "../../users/interfaces/user.interface";

export interface Role extends Resource {
  name: string;
  permissions?: Permissions[];
  priority: number;
  users?: User[];
}
