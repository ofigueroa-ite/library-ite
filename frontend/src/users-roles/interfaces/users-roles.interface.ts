import type { Resource } from "~/common/interfaces/resource";

export interface UsersRoles extends Resource {
  roleId: string;
  userId: string;
}
