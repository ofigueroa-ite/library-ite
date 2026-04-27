import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/common/interfaces/crud-service.interface";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { Repository } from "typeorm";
import { Department } from "./departments.entity";
import { DepartmentsCreateDto } from "./dtos/departments-create.dto";
import { DepartmentsPaginationQueryDto } from "./dtos/departments-pagination-query.dto";
import { DepartmentsUpdateDto } from "./dtos/departments-update.dto";
import { DepartmentsPaginationQueryBuilder } from "./query-builders/departments-paginaton-query.builder";

@Injectable()
export class DepartmentsService implements CrudService<Department> {
  constructor(
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>
  ) {}

  findById(id: string): Promise<Department | null> {
    return this.departmentsRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: string): Promise<Department> {
    const department = await this.departmentsRepository.findOneBy({ id });
    if (!department) {
      throw new NotFoundException();
    }
    return department;
  }

  findByName(name: string): Promise<Department | null> {
    return this.departmentsRepository.findOne({
      where: { name },
    });
  }

  async findByNameOrThrow(name: string): Promise<Department> {
    const department = await this.departmentsRepository.findOneBy({ name });
    if (!department) {
      throw new NotFoundException();
    }
    return department;
  }

  async findPage(
    dto: DepartmentsPaginationQueryDto
  ): Promise<PaginationResult<Department>> {
    const {
      limit,
      page,
      skip,
      createdFrom,
      createdTo,
      search,
      sortBy,
      sortOrder,
      updatedFrom,
      updatedTo,
    } = dto;

    const [data, total] = await new DepartmentsPaginationQueryBuilder(
      this.departmentsRepository
    )
      .withSearch(search)
      .withCreateDateRange(createdFrom, createdTo)
      .withUpdateDateRange(updatedFrom, updatedTo)
      .withSorting(sortBy, sortOrder)
      .withPagination(skip, limit)
      .build()
      .getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async throwIfRoleNameExists(name: string): Promise<void> {
    const department = await this.departmentsRepository.findOneBy({ name });
    if (department) {
      throw new ConflictException();
    }
  }

  async create(dto: DepartmentsCreateDto): Promise<Department> {
    await this.throwIfRoleNameExists(dto.name);
    const department = this.departmentsRepository.create(dto);
    return this.departmentsRepository.save(department);
  }

  async update(id: string, dto: DepartmentsUpdateDto): Promise<Department> {
    const department = await this.findByIdOrThrow(id);

    if (dto.name && dto.name !== department.name) {
      await this.throwIfRoleNameExists(dto.name);
    }
    Object.assign(department, dto);
    return this.departmentsRepository.save(department);
  }

  async delete(id: string): Promise<void> {
    await this.findByIdOrThrow(id);
    await this.departmentsRepository.softDelete({ id });
  }
}
