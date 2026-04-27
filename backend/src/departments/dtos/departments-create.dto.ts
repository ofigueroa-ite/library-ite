import { IsNotEmpty, IsString } from "class-validator";

export class DepartmentsCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
