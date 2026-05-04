import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/common/interfaces/crud-service.interface";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { Repository } from "typeorm";
import { StudentsDegreesCreateDto } from "./dtos/students-degrees-create.dto";
import { StudentsDegreesPaginationQueryDto } from "./dtos/students-degrees-pagination-query.dto";
import { StudentsDegreesUpdateDto } from "./dtos/students-degrees-update.dto";
import { StudentsDegreesPaginationQueryBuilder } from "./query-builders/students-degrees-pagination-query.builder";
import { StudentsDegrees } from "./students-degrees.entity";

@Injectable()
export class StudentsDegreesService implements CrudService<StudentsDegrees> {
  constructor(
    @InjectRepository(StudentsDegrees)
    private readonly studentsDegreesRepository: Repository<StudentsDegrees>
  ) {}

  findById(id: string): Promise<StudentsDegrees | null> {
    return this.studentsDegreesRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: string): Promise<StudentsDegrees> {
    const result = await this.studentsDegreesRepository.findOneBy({ id });
    if (!result) {
      throw new Error(`StudentsDegrees with id ${id} not found`);
    }
    return result;
  }

  async findPage(
    dto: StudentsDegreesPaginationQueryDto
  ): Promise<PaginationResult<StudentsDegrees>> {
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

    const [data, total] = await new StudentsDegreesPaginationQueryBuilder(
      this.studentsDegreesRepository
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

  async throwIfExists(studentId: string, degreeId: string): Promise<void> {
    const result = await this.studentsDegreesRepository.findOneBy({
      studentId,
      degreeId,
    });
    if (result) {
      throw new ConflictException();
    }
  }

  async create(dto: StudentsDegreesCreateDto): Promise<StudentsDegrees> {
    await this.throwIfExists(dto.studentId, dto.degreeId);
    const studentsDegrees = this.studentsDegreesRepository.create(dto);
    return this.studentsDegreesRepository.save(studentsDegrees);
  }

  async update(
    id: string,
    dto: StudentsDegreesUpdateDto
  ): Promise<StudentsDegrees> {
    if (dto.studentId && dto.degreeId) {
      await this.throwIfExists(dto.studentId, dto.degreeId);
    }
    const result = await this.findByIdOrThrow(id);
    Object.assign(result, dto);
    return this.studentsDegreesRepository.save(result);
  }

  async delete(id: string): Promise<void> {
    await this.findByIdOrThrow(id);
    await this.studentsDegreesRepository.softDelete({ id });
  }
}
