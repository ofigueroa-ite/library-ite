import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { SortOrder } from "src/common/enums/sort-order";

export enum UserSortBy {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  EMAIL = "email",
  NAME = "name",
  SURNAME = "surname",
}

export class QueryUserDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserSortBy)
  sortBy: UserSortBy = UserSortBy.CREATED_AT;

  @IsOptional()
  @IsString()
  @IsEnum(SortOrder)
  sortOrder: SortOrder = SortOrder.DESC;
}
