import { IsNotEmpty, IsString } from "class-validator";

export class CreateOtpDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
