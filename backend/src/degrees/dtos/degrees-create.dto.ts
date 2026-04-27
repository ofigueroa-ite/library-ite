import { IsNotEmpty, IsString } from "class-validator";

export class DegreesCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
