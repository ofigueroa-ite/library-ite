import { Role } from "../../roles/interfaces/role.interface";

export interface User {
  createdAt: string;
  deleteAt: string | null;
  id: string;
  name: string;
  roles: Role[];
  surname: string;
  updateAt: string;
}
