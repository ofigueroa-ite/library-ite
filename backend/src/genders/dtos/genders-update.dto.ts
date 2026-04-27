import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GendersUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
