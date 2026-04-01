import { IsDivisibleBy, IsInt, IsNotEmpty, IsString } from "class-validator";

export class RolesCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsDivisibleBy(100)
  priority: number;
}
