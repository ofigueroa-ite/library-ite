import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class StudentsUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
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
  @IsOptional()
  givenNames: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  paternalSurname: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  maternalSurname: string;
}
