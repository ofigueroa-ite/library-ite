import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UsersCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
