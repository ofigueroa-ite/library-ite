import { IsNotEmpty, IsString } from "class-validator";

export class OtpCreateDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
