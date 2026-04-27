import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/common/interfaces/crud-service.interface";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { Repository } from "typeorm";
import { GendersCreateDto } from "./dtos/genders-create.dto";
import { GendersPaginationQueryDto } from "./dtos/genders-pagination-query.dto";
import { GendersUpdateDto } from "./dtos/genders-update.dto";
import { Gender } from "./genders.entity";
import { GendersPaginationQueryBuilder } from "./query-builders/genders-paginaton-query.builder";

@Injectable()
export class GendersService implements CrudService<Gender> {
  constructor(
    @InjectRepository(Gender)
    private readonly gendersRepository: Repository<Gender>
  ) {}

  findById(id: string): Promise<Gender | null> {
    return this.gendersRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: string): Promise<Gender> {
    const gender = await this.gendersRepository.findOneBy({ id });
    if (!gender) {
      throw new NotFoundException();
    }
    return gender;
  }

  findByName(name: string): Promise<Gender | null> {
    return this.gendersRepository.findOne({
      where: { name },
    });
  }

  async findByNameOrThrow(name: string): Promise<Gender> {
    const gender = await this.gendersRepository.findOneBy({ name });
    if (!gender) {
      throw new NotFoundException();
    }
    return gender;
  }

  async findPage(
    dto: GendersPaginationQueryDto
  ): Promise<PaginationResult<Gender>> {
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

    const [data, total] = await new GendersPaginationQueryBuilder(
      this.gendersRepository
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
    const gender = await this.gendersRepository.findOneBy({ name });
    if (gender) {
      throw new ConflictException();
    }
  }

  async create(dto: GendersCreateDto): Promise<Gender> {
    await this.throwIfRoleNameExists(dto.name);
    const gender = this.gendersRepository.create(dto);
    return this.gendersRepository.save(gender);
  }

  async update(id: string, dto: GendersUpdateDto): Promise<Gender> {
    const gender = await this.findByIdOrThrow(id);

    if (dto.name && dto.name !== gender.name) {
      await this.throwIfRoleNameExists(dto.name);
    }
    Object.assign(gender, dto);
    return this.gendersRepository.save(gender);
  }

  async delete(id: string): Promise<void> {
    await this.findByIdOrThrow(id);
    await this.gendersRepository.softDelete({ id });
  }
}
