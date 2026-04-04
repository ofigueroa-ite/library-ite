import { Type } from "class-transformer";
import { IsDateString, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  createdFrom?: Date;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  createdTo?: Date;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  updatedFrom?: Date;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  updatedTo?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
