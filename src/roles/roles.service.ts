import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/common/interfaces/crud-service.interface";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { Repository } from "typeorm";
import { RolesCreateDto } from "./dtos/roles-create.dto";
import { RolesPaginationQueryDto } from "./dtos/roles-pagination-query.dto";
import { RolesUpdateDto } from "./dtos/roles-update.dto";
import { RolesPaginationQueryBuilder } from "./query-builders/roles-pagination-query.builder";
import { Role } from "./roles.entity";

@Injectable()
export class RolesService implements CrudService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>
  ) {}

  findById(id: string): Promise<Role | null> {
    return this.rolesRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException();
    }
    return role;
  }

  findByName(name: string): Promise<Role | null> {
    return this.rolesRepository.findOneBy({ name });
  }

  async findByNameOrThrow(name: string): Promise<Role> {
    const role = await this.rolesRepository.findOneBy({ name });
    if (!role) {
      throw new NotFoundException();
    }
    return role;
  }

  async findPage(
    dto: RolesPaginationQueryDto
  ): Promise<PaginationResult<Role>> {
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

    const [data, total] = await new RolesPaginationQueryBuilder(
      this.rolesRepository
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
    const role = await this.rolesRepository.findOneBy({ name });
    if (role) {
      throw new ConflictException();
    }
  }

  async create(dto: RolesCreateDto): Promise<Role> {
    await this.throwIfRoleNameExists(dto.name);
    const role = this.rolesRepository.create(dto);
    return this.rolesRepository.save(role);
  }

  async update(id: string, dto: RolesUpdateDto): Promise<Role> {
    const role = await this.findByIdOrThrow(id);
    if (dto.name && dto.name !== role.name) {
      await this.throwIfRoleNameExists(dto.name);
    }
    Object.assign(role, dto);
    return this.rolesRepository.save(role);
  }

  async delete(id: string): Promise<void> {
    await this.findByIdOrThrow(id);
    await this.rolesRepository.softDelete({ id });
  }
}
