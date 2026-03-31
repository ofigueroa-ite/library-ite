import { PaginationQueryBuilder } from "src/common/query-builders/pagination-query.builder";
import { Repository } from "typeorm";
import { Role } from "../roles.entity";

export class RolesPaginationQueryBuilder extends PaginationQueryBuilder<Role> {
  constructor(repository: Repository<Role>) {
    super(repository.createQueryBuilder("role"));
  }

  withSearch(search?: string): this {
    if (search) {
      this.queryBuilder.where(`${this.alias}.name ILIKE :search`, {
        search: `%${search}%`,
      });
    }
    return this;
  }
}
