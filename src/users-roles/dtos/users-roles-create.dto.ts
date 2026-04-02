import { IsUUID } from "class-validator";

export class UsersRolesCreateDto {
  @IsUUID()
  userId: string;
  @IsUUID()
  roleId: string;
}
