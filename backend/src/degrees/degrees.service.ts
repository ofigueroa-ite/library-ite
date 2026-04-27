import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/common/interfaces/crud-service.interface";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { Repository } from "typeorm";
import { Degree } from "./degrees.entity";
import { DegreesCreateDto } from "./dtos/degrees-create.dto";
import { DegreesPaginationQueryDto } from "./dtos/degrees-pagination-query.dto";
import { DegreesUpdateDto } from "./dtos/degrees-update.dto";
import { DegreesPaginationQueryBuilder } from "./query-builders/degrees-paginaton-query.builder";

@Injectable()
export class DegreesService implements CrudService<Degree> {
  constructor(
    @InjectRepository(Degree)
    private readonly degreesRepository: Repository<Degree>
  ) {}

  findById(id: string): Promise<Degree | null> {
    return this.degreesRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: string): Promise<Degree> {
    const degree = await this.degreesRepository.findOneBy({ id });
    if (!degree) {
      throw new NotFoundException();
    }
    return degree;
  }

  findByName(name: string): Promise<Degree | null> {
    return this.degreesRepository.findOne({
      where: { name },
    });
  }

  async findByNameOrThrow(name: string): Promise<Degree> {
    const degree = await this.degreesRepository.findOneBy({ name });
    if (!degree) {
      throw new NotFoundException();
    }
    return degree;
  }

  async findPage(
    dto: DegreesPaginationQueryDto
  ): Promise<PaginationResult<Degree>> {
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

    const [data, total] = await new DegreesPaginationQueryBuilder(
      this.degreesRepository
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
    const degree = await this.degreesRepository.findOneBy({ name });
    if (degree) {
      throw new ConflictException();
    }
  }

  async create(dto: DegreesCreateDto): Promise<Degree> {
    await this.throwIfRoleNameExists(dto.name);
    const degree = this.degreesRepository.create(dto);
    return this.degreesRepository.save(degree);
  }

  async update(id: string, dto: DegreesUpdateDto): Promise<Degree> {
    const degree = await this.findByIdOrThrow(id);

    if (dto.name && dto.name !== degree.name) {
      await this.throwIfRoleNameExists(dto.name);
    }
    Object.assign(degree, dto);
    return this.degreesRepository.save(degree);
  }

  async delete(id: string): Promise<void> {
    await this.findByIdOrThrow(id);
    await this.degreesRepository.softDelete({ id });
  }
}
