import { IsNotEmpty, IsString } from "class-validator";

export class GendersCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
