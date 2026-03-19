import { PaginationDto } from "../dtos/pagination.dto";
import { PaginationResult } from "./pagination-result";

export interface CrudService<T> {
  create(data: T): Promise<T>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<T | null>;
  findByIdOrThrow(id: string): Promise<T>;
  findPage(params: PaginationDto): Promise<PaginationResult<T>>;
  update(id: string, data: T): Promise<T>;
}
