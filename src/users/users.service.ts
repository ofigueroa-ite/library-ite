import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SortOrder } from "src/common/enums/sort-order";
import { PaginationResult } from "src/common/interfaces/pagination-result";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { QueryUserDto, UserSortBy } from "./dtos/query-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./users.entity";

class UserQueryBuilder {
  private readonly query: SelectQueryBuilder<User>;
  constructor(private readonly repository: Repository<User>) {
    this.query = this.repository.createQueryBuilder("user");
  }

  withSearch(search?: string): this {
    if (search) {
      this.query.where("user.name ILIKE :search OR user.email ILIKE :search", {
        search: `%${search}%`,
      });
    }
    return this;
  }

  withCreateDateRange(createdFrom?: Date, createdTo?: Date): this {
    if (createdFrom) {
      this.query.andWhere("user.createdAt >= :createdFrom", { createdFrom });
    }
    if (createdTo) {
      this.query.andWhere("user.createdAt <= :createdTo", { createdTo });
    }
    return this;
  }

  withUpdateDateRange(updatedFrom?: Date, updatedTo?: Date): this {
    if (updatedFrom) {
      this.query.andWhere("user.updatedAt >= :updatedFrom", { updatedFrom });
    }
    if (updatedTo) {
      this.query.andWhere("user.updatedAt <= :updatedTo", { updatedTo });
    }
    return this;
  }

  withSorting(sortBy: UserSortBy, sortOrder: SortOrder): this {
    this.query.orderBy(`user.${sortBy}`, sortOrder);
    return this;
  }

  withPagination(skip: number, limit: number): this {
    this.query.skip(skip).take(limit);
    return this;
  }

  build(): SelectQueryBuilder<User> {
    return this.query;
  }
}

@Injectable()
export class UsersService {
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

  async findAll(dto: QueryUserDto): Promise<PaginationResult<User>> {
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

    const [data, total] = await new UserQueryBuilder(this.usersRepository)
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

  async create(dto: CreateUserDto): Promise<User> {
    await this.throwIfEmailExists(dto.email);
    const newUser = this.usersRepository.create(dto);
    return this.usersRepository.save(newUser);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
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
