import { PaginationQueryBuilder } from "src/common/query-builders/pagination-query.builder";
import { Repository } from "typeorm";
import { StudentsDegrees } from "../students-degrees.entity";

export class StudentsDegreesPaginationQueryBuilder extends PaginationQueryBuilder<StudentsDegrees> {
  constructor(repository: Repository<StudentsDegrees>) {
    super(repository.createQueryBuilder("students_degrees"));
  }
}
