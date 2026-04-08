import { Permissions } from "../../permissions/interfaces/permissions.interface";

export interface Role {
  createdAt: string;
  deletedAt: string | null;
  name: string;
  permissions: Permissions[];
  priority: number;
  updatedAt: string;
}
