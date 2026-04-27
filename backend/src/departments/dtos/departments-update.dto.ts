import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DepartmentsUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
