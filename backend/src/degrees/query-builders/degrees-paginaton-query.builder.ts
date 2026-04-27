import { PaginationQueryBuilder } from "src/common/query-builders/pagination-query.builder";
import { Repository } from "typeorm";
import { Degree } from "../degrees.entity";

export class DegreesPaginationQueryBuilder extends PaginationQueryBuilder<Degree> {
  constructor(repository: Repository<Degree>) {
    super(repository.createQueryBuilder("degree"));
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
