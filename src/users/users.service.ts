import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/common/interfaces/crud-service.interface";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { Repository } from "typeorm";
import { UsersCreateDto } from "./dtos/users-create.dto";
import { UsersPaginationQueryDto } from "./dtos/users-pagination-query.dto";
import { UsersUpdateDto } from "./dtos/users-update.dto";
import { UsersPaginationQueryBuilder } from "./query-builders/users-pagination-query.builder";
import { User } from "./users.entity";

@Injectable()
export class UsersService implements CrudService<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  findById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findByEmailOrThrow(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findPage(
    dto: UsersPaginationQueryDto
  ): Promise<PaginationResult<User>> {
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

    const [data, total] = await new UsersPaginationQueryBuilder(
      this.usersRepository
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

  async throwIfEmailExists(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (user) {
      throw new ConflictException("Email already exists");
    }
  }

  async create(dto: UsersCreateDto): Promise<User> {
    await this.throwIfEmailExists(dto.email);
    const newUser = this.usersRepository.create(dto);
    return this.usersRepository.save(newUser);
  }

  async update(id: string, dto: UsersUpdateDto): Promise<User> {
    const user = await this.findByIdOrThrow(id);
    if (dto.email && dto.email !== user.email) {
      await this.throwIfEmailExists(dto.email);
    }
    Object.assign(user, dto);
    return this.usersRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.findByIdOrThrow(id);
    await this.usersRepository.softDelete({ id });
  }
}
