import { PaginationQueryBuilder } from "src/common/query-builders/pagination-query.builder";
import { Student } from "src/students/students.entity";
import { Repository } from "typeorm";

export class StudentsPaginationQueryBuilder extends PaginationQueryBuilder<Student> {
  constructor(repository: Repository<Student>) {
    super(repository.createQueryBuilder("student"));
  }

  withSearch(search?: string): this {
    if (search) {
      this.queryBuilder.andWhere(
        `${this.alias}.givenNames ILIKE :search
        OR ${this.alias}.paternalSurname ILIKE :search
        OR ${this.alias}.maternalSurname ILIKE :search
        OR ${this.alias}.email ILIKE :search
        OR ${this.alias}.phone ILIKE :search
        OR ${this.alias}.controlNumber ILIKE :search`,
        {
          search: `%${search}%`,
        }
      );
    }
    return this;
  }
}
