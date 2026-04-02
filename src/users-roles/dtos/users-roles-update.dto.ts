import { IsOptional, IsUUID } from "class-validator";

export class UsersRolesUpdateDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  roleId?: string;
}
