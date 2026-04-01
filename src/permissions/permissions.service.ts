import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/common/interfaces/crud-service.interface";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { FindOptionsWhere, Repository } from "typeorm";
import { PermissionsCreateDto } from "./dtos/permissions-create.dto";
import { PermissionsPaginationQueryDto } from "./dtos/permissions-pagination-query.dto";
import { PermissionsUpdateDto } from "./dtos/permissions-update.dto";
import { Permission } from "./permissions.entity";
import { PermissionsPaginationQueryBuilder } from "./query-builders/permissions-pagination-query.builder";

@Injectable()
export class PermissionsService implements CrudService<Permission> {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>
  ) {}

  findById(id: string): Promise<Permission | null> {
    return this.permissionsRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: string): Promise<Permission> {
    const permission = await this.permissionsRepository.findOneBy({ id });
    if (!permission) {
      throw new NotFoundException();
    }
    return permission;
  }

  async findPage(
    dto: PermissionsPaginationQueryDto
  ): Promise<PaginationResult<Permission>> {
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

    const [data, total] = await new PermissionsPaginationQueryBuilder(
      this.permissionsRepository
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

  async throwIfPermissionExists(
    where: FindOptionsWhere<Permission>
  ): Promise<void> {
    const existing = await this.permissionsRepository.findOneBy(where);
    if (existing) {
      throw new ConflictException();
    }
  }

  async create(dto: PermissionsCreateDto): Promise<Permission> {
    const { action, subject, roleId, inverted } = dto;
    await this.throwIfPermissionExists({ roleId, action, subject, inverted });
    const permission = this.permissionsRepository.create(dto);
    return this.permissionsRepository.save(permission);
  }

  async update(id: string, dto: PermissionsUpdateDto): Promise<Permission> {
    const { action, subject, roleId, inverted } = dto;
    await this.throwIfPermissionExists({ roleId, action, subject, inverted });
    const permission = await this.findByIdOrThrow(id);
    Object.assign(permission, dto);
    return this.permissionsRepository.save(permission);
  }

  async delete(id: string): Promise<void> {
    const permission = await this.findByIdOrThrow(id);
    await this.permissionsRepository.softDelete({ id: permission.id });
  }
}
