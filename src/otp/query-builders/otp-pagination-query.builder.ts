import { PaginationQueryBuilder } from "src/common/query-builders/pagination-query.builder";
import { Repository } from "typeorm";
import { Otp } from "../otp.entity";

export class OtpPaginationQueryBuilder extends PaginationQueryBuilder<Otp> {
  constructor(repository: Repository<Otp>) {
    super(repository.createQueryBuilder("otp"));
  }

  withSearch(search?: string): this {
    if (search) {
      this.queryBuilder.where(`${this.alias}.code ILIKE :search`, {
        search: `%${search}%`,
      });
    }
    return this;
  }

  withExpiresDateRange(expiresFrom?: Date, expiresTo?: Date): this {
    if (expiresFrom) {
      this.queryBuilder.andWhere(`${this.alias}.expiresAt >= :expiresFrom`, {
        expiresFrom,
      });
    }
    if (expiresTo) {
      this.queryBuilder.andWhere(`${this.alias}.expiresAt <= :expiresTo`, {
        expiresTo,
      });
    }
    return this;
  }
}
