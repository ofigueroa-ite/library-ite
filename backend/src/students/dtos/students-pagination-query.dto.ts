import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaginationSortOrder } from "src/common/enums/pagination-sort-order.enum";

export enum StudentsPaginationSortBy {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  CONTROL_NUMBER = "controlNumber",
  EMAIL = "email",
  PHONE = "phone",
  GIVEN_NAMES = "givenNames",
  PATERNAL_SURNAME = "paternalSurname",
  MATERNAL_SURNAME = "maternalSurname",
}

export class StudentsPaginationQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StudentsPaginationSortBy)
  sortBy: StudentsPaginationSortBy = StudentsPaginationSortBy.CREATED_AT;

  @IsOptional()
  @IsString()
  @IsEnum(PaginationSortOrder)
  sortOrder: PaginationSortOrder = PaginationSortOrder.DESC;
}
