export enum PaginationSortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface PaginationDto {
  createdFrom?: Date;
  createdTo?: Date;
  limit?: number;
  page?: number;
  sortOrder?: PaginationSortOrder;
  updatedFrom?: Date;
  updatedTo?: Date;
}

export interface PaginationResultMeta {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface PaginationResult<T> {
  data: T[];
  meta: PaginationResultMeta;
}
