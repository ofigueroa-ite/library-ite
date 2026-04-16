import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/common/interfaces/crud-service.interface";
import { EnvironmentVariables } from "src/common/interfaces/environment-variables.interface";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { Repository } from "typeorm";
import { RolesCreateDto } from "./dtos/roles-create.dto";
import { RolesPaginationQueryDto } from "./dtos/roles-pagination-query.dto";
import { RolesUpdateDto } from "./dtos/roles-update.dto";
import { RolesPaginationQueryBuilder } from "./query-builders/roles-pagination-query.builder";
import { Role } from "./roles.entity";

@Injectable()
export class RolesService implements CrudService<Role> {
  private readonly superAdminRoleName: string;
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly configService: ConfigService<EnvironmentVariables, true>
  ) {
    this.superAdminRoleName = this.configService.get(
      "SEEDER_SUPER_ADMIN_ROLE_NAME",
      { infer: true }
    );
  }

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
    return this.rolesRepository.findOne({
      where: { name },
      relations: ["permissions"],
    });
  }

  findByPriority(priority: number): Promise<Role | null> {
    return this.rolesRepository.findOne({
      where: { priority },
      relations: ["permissions"],
    });
  }

  async findByPriorityOrThrow(priority: number): Promise<Role> {
    const role = await this.findByPriority(priority);
    if (!role) {
      throw new NotFoundException();
    }
    return role;
  }

  findSuperAdminRole(): Promise<Role | null> {
    return this.findByName(this.superAdminRoleName);
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

  async throwIfRolePriorityExists(priority: number): Promise<void> {
    const role = await this.rolesRepository.findOneBy({ priority });
    if (role) {
      throw new ConflictException();
    }
  }

  async create(dto: RolesCreateDto): Promise<Role> {
    await this.throwIfRoleNameExists(dto.name);
    await this.throwIfRolePriorityExists(dto.priority);
    const role = this.rolesRepository.create(dto);
    return this.rolesRepository.save(role);
  }

  async update(id: string, dto: RolesUpdateDto): Promise<Role> {
    const role = await this.findByIdOrThrow(id);

    if (role.name === this.superAdminRoleName) {
      throw new ForbiddenException();
    }

    if (dto.name && dto.name !== role.name) {
      await this.throwIfRoleNameExists(dto.name);
    }
    Object.assign(role, dto);
    return this.rolesRepository.save(role);
  }

  async delete(id: string): Promise<void> {
    const superAdminRole = await this.findSuperAdminRole();

    if (superAdminRole?.id === id) {
      throw new ForbiddenException();
    }

    await this.findByIdOrThrow(id);
    await this.rolesRepository.softDelete({ id });
  }
}
