import { PaginationQueryBuilder } from "src/common/query-builders/pagination-query.builder";
import { Repository } from "typeorm";
import { Permission } from "../permissions.entity";

export class PermissionsPaginationQueryBuilder extends PaginationQueryBuilder<Permission> {
  constructor(repository: Repository<Permission>) {
    super(repository.createQueryBuilder("permission"));
  }

  withSearch(search?: string): this {
    if (search) {
      this.queryBuilder.where(
        `${this.alias}.action ILIKE :search OR ${this.alias}.subject ILIKE :search`,
        { search: `%${search}%` }
      );
    }
    return this;
  }
}
