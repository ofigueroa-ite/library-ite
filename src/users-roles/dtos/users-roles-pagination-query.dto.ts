import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaginationSortOrder } from "src/common/enums/pagination-sort-order.enum";

export enum UsersRolesPaginationSortBy {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  USER_ID = "userId",
  ROLE_ID = "roleId",
}

export class UsersRolesPaginationQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @IsEnum(UsersRolesPaginationSortBy)
  sortBy: UsersRolesPaginationSortBy = UsersRolesPaginationSortBy.CREATED_AT;

  @IsOptional()
  @IsString()
  @IsEnum(PaginationSortOrder)
  sortOrder: PaginationSortOrder = PaginationSortOrder.DESC;
}
