import { IsArray, IsUUID } from "class-validator";

export class UsersRolesCreateDto {
  @IsUUID()
  userId: string;

  @IsArray()
  @IsUUID("4", { each: true })
  roleIds: string[];
}
