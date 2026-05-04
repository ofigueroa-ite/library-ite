import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaginationSortOrder } from "src/common/enums/pagination-sort-order.enum";

export enum StudentsDegreesPaginationSortBy {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  STUDENT_ID = "studentId",
  DEGREE_ID = "degreeId",
}

export class StudentsDegreesPaginationQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @IsEnum(StudentsDegreesPaginationSortBy)
  sortBy: StudentsDegreesPaginationSortBy =
    StudentsDegreesPaginationSortBy.CREATED_AT;

  @IsOptional()
  @IsString()
  @IsEnum(PaginationSortOrder)
  sortOrder: PaginationSortOrder = PaginationSortOrder.DESC;
}
