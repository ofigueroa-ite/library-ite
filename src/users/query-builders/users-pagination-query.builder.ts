import { PaginationQueryBuilder } from "src/common/query-builders/pagination-query.builder";
import { Repository } from "typeorm";
import { User } from "../users.entity";

export class UsersPaginationQueryBuilder extends PaginationQueryBuilder<User> {
  constructor(repository: Repository<User>) {
    super(repository.createQueryBuilder("user"));
  }

  withSearch(search?: string): this {
    if (search) {
      this.queryBuilder.where(
        `${this.alias}.name ILIKE :search OR ${this.alias}.email ILIKE :search`,
        { search: `%${search}%` }
      );
    }
    return this;
  }
}
