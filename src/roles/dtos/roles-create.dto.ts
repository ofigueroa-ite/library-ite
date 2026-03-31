import { IsNotEmpty, IsString } from "class-validator";

export class RolesCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
