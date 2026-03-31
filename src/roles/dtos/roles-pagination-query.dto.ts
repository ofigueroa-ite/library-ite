import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaginationSortOrder } from "src/common/enums/pagination-sort-order.enum";

export enum RolesPaginationSortBy {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  NAME = "name",
}

export class RolesPaginationQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsEnum(RolesPaginationSortBy)
  sortBy: RolesPaginationSortBy = RolesPaginationSortBy.CREATED_AT;

  @IsOptional()
  @IsString()
  @IsEnum(PaginationSortOrder)
  sortOrder: PaginationSortOrder = PaginationSortOrder.DESC;
}
