import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/common/interfaces/crud-service.interface";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { Repository } from "typeorm";
import { UsersRolesCreateDto } from "./dtos/users-roles-create.dto";
import { UsersRolesPaginationQueryDto } from "./dtos/users-roles-pagination-query.dto";
import { UsersRolesUpdateDto } from "./dtos/users-roles-update.dto";
import { UsersRolesPaginationQueryBuilder } from "./query-builders/users-roles-pagination-query.builder";
import { UsersRoles } from "./users-roles.entity";

@Injectable()
export class UsersRolesService implements CrudService<UsersRoles> {
  constructor(
    @InjectRepository(UsersRoles)
    private readonly usersRolesRepository: Repository<UsersRoles>
  ) {}

  findById(id: string): Promise<UsersRoles | null> {
    return this.usersRolesRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: string): Promise<UsersRoles> {
    const userRole = await this.usersRolesRepository.findOneBy({ id });
    if (!userRole) {
      throw new NotFoundException();
    }
    return userRole;
  }

  async findPage(
    dto: UsersRolesPaginationQueryDto
  ): Promise<PaginationResult<UsersRoles>> {
    const {
      limit,
      page,
      skip,
      createdFrom,
      createdTo,
      sortBy,
      sortOrder,
      updatedFrom,
      updatedTo,
    } = dto;

    const [data, total] = await new UsersRolesPaginationQueryBuilder(
      this.usersRolesRepository
    )
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

  async throwIfExists(userId: string, roleId: string): Promise<void> {
    const existing = await this.usersRolesRepository.findOneBy({
      userId,
      roleId,
    });
    if (existing) {
      throw new ConflictException();
    }
  }

  async create(dto: UsersRolesCreateDto): Promise<UsersRoles> {
    await this.throwIfExists(dto.userId, dto.roleId);
    const userRole = this.usersRolesRepository.create(dto);
    return this.usersRolesRepository.save(userRole);
  }

  async update(id: string, dto: UsersRolesUpdateDto): Promise<UsersRoles> {
    const existing = await this.usersRolesRepository.findOneBy({
      userId: dto.userId,
      roleId: dto.roleId,
    });
    if (existing && existing.id !== id) {
      throw new ConflictException();
    }
    const userRole = await this.findByIdOrThrow(id);
    Object.assign(userRole, dto);
    return this.usersRolesRepository.save(userRole);
  }

  async delete(id: string): Promise<void> {
    await this.findByIdOrThrow(id);
    await this.usersRolesRepository.softDelete({ id });
  }
}
