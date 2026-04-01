import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaginationSortOrder } from "src/common/enums/pagination-sort-order.enum";

export enum PermissionsPaginationSortBy {
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  ACTION = "action",
  SUBJECT = "subject",
  ROLE_ID = "roleId",
  INVERTED = "inverted",
}

export class PermissionsPaginationQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsEnum(PermissionsPaginationSortBy)
  sortBy: PermissionsPaginationSortBy = PermissionsPaginationSortBy.CREATED_AT;

  @IsOptional()
  @IsString()
  @IsEnum(PaginationSortOrder)
  sortOrder: PaginationSortOrder = PaginationSortOrder.DESC;
}
