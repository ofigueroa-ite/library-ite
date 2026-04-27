import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DegreesUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
