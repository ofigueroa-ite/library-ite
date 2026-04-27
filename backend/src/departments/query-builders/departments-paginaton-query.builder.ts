import { PaginationQueryBuilder } from "src/common/query-builders/pagination-query.builder";
import { Repository } from "typeorm";
import { Department } from "../departments.entity";

export class DepartmentsPaginationQueryBuilder extends PaginationQueryBuilder<Department> {
  constructor(repository: Repository<Department>) {
    super(repository.createQueryBuilder("department"));
  }

  withSearch(search?: string): this {
    if (search) {
      this.queryBuilder.andWhere(`${this.alias}.name ILIKE :search`, {
        search: `%${search}%`,
      });
    }
    return this;
  }
}
