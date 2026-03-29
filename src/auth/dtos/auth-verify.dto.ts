import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthVerifyDto {
  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
