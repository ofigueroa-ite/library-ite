import { IsOptional, IsUUID } from "class-validator";

export class StudentsDegreesUpdateDto {
  @IsOptional()
  @IsUUID()
  studentId?: string;

  @IsOptional()
  @IsUUID()
  degreeId?: string;
}
