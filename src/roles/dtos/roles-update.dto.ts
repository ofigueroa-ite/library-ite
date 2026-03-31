import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RolesUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
