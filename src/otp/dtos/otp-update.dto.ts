import { Type } from "class-transformer";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class OtpUpdateDto {
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  expiresAt?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsNumber()
  attempts?: number;
}
