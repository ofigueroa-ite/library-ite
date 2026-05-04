import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class StudentsCreateDto {
  @IsString()
  @IsNotEmpty()
  controlNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  givenNames: string;

  @IsString()
  @IsNotEmpty()
  paternalSurname: string;

  @IsString()
  @IsNotEmpty()
  maternalSurname: string;
}
