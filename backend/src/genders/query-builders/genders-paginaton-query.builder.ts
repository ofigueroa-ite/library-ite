import { PaginationQueryBuilder } from "src/common/query-builders/pagination-query.builder";
import { Repository } from "typeorm";
import { Gender } from "../genders.entity";

export class GendersPaginationQueryBuilder extends PaginationQueryBuilder<Gender> {
  constructor(repository: Repository<Gender>) {
    super(repository.createQueryBuilder("role"));
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
