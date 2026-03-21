import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaginationSortOrder } from "src/common/enums/pagination-sort-order.enum";

export enum OtpSortBy {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  EXPIRES_AT = "expiresAt",
  CODE = "code",
}

export class OtpPaginationQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  expiresFrom?: Date;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  expiresTo?: Date;

  @IsOptional()
  @IsString()
  @IsEnum(OtpSortBy)
  sortBy: OtpSortBy = OtpSortBy.CREATED_AT;

  @IsOptional()
  @IsString()
  @IsEnum(PaginationSortOrder)
  sortOrder: PaginationSortOrder = PaginationSortOrder.DESC;
}
