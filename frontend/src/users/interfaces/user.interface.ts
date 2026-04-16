import type { Resource } from "../../common/interfaces/resource";
import type { Role } from "../../roles/interfaces/role.interface";

export interface User extends Resource {
  email: string;
  name: string;
  roles?: Role[];
  surname: string;
}
