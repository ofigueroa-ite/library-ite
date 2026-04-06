export interface User {
  createdAt: string;
  deleteAt: string | null;
  id: string;
  name: string;
  roles: unknown[];
  surname: string;
  updateAt: string;
}
