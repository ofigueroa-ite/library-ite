import { PaginationDto } from "../dtos/pagination.dto";
import { PaginationResult } from "./pagination-result.interface";

export interface CrudService<T> {
  create(dto: Partial<T>): Promise<T | T[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<T | null>;
  findByIdOrThrow(id: string): Promise<T>;
  findPage(dto: PaginationDto): Promise<PaginationResult<T>>;
  update(id: string, dto: Partial<T>): Promise<T>;
}
