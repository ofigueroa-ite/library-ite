import { SelectQueryBuilder } from "typeorm";
import { BaseEntity } from "../entities/base.entity";
import { PaginationSortOrder } from "../enums/pagination-sort-order.enum";

export abstract class PaginationQueryBuilder<T extends BaseEntity> {
  protected queryBuilder: SelectQueryBuilder<T>;
  protected readonly alias: string;

  constructor(queryBuilder: SelectQueryBuilder<T>) {
    this.queryBuilder = queryBuilder;
    this.alias = queryBuilder.alias;
  }

  withCreateDateRange(createdFrom?: Date, createdTo?: Date): this {
    if (createdFrom) {
      this.queryBuilder.andWhere(`${this.alias}.createdAt >= :createdFrom`, {
        createdFrom,
      });
    }
    if (createdTo) {
      this.queryBuilder.andWhere(`${this.alias}.createdAt <= :createdTo`, {
        createdTo,
      });
    }
    return this;
  }

  withUpdateDateRange(updatedFrom?: Date, updatedTo?: Date): this {
    if (updatedFrom) {
      this.queryBuilder.andWhere(`${this.alias}.updatedAt >= :updatedFrom`, {
        updatedFrom,
      });
    }
    if (updatedTo) {
      this.queryBuilder.andWhere(`${this.alias}.updatedAt <= :updatedTo`, {
        updatedTo,
      });
    }
    return this;
  }

  withPagination(skip: number, limit: number): this {
    this.queryBuilder.skip(skip).take(limit);
    return this;
  }

  withSorting(sortBy: keyof T & string, sortOrder: PaginationSortOrder): this {
    this.queryBuilder.orderBy(`${this.alias}.${sortBy}`, sortOrder);
    return this;
  }

  build(): SelectQueryBuilder<T> {
    return this.queryBuilder;
  }
}
