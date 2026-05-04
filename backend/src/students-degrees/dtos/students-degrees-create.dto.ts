import { IsUUID } from "class-validator";

export class StudentsDegreesCreateDto {
  @IsUUID()
  studentId: string;
  @IsUUID()
  degreeId: string;
}
