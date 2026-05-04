import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/common/interfaces/crud-service.interface";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { Repository } from "typeorm";
import { StudentsCreateDto } from "./dtos/students-create.dto";
import { StudentsPaginationQueryDto } from "./dtos/students-pagination-query.dto";
import { StudentsUpdateDto } from "./dtos/students-update.dto";
import { StudentsPaginationQueryBuilder } from "./query-builders/students-pagination-query.builder";
import { Student } from "./students.entity";

@Injectable()
export class StudentsService implements CrudService<Student> {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>
  ) {}

  findById(id: string): Promise<Student | null> {
    return this.studentsRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: string): Promise<Student> {
    const student = await this.studentsRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException();
    }
    return student;
  }

  findByEmail(email: string): Promise<Student | null> {
    return this.studentsRepository.findOneBy({ email });
  }

  async findByEmailOrThrow(email: string): Promise<Student> {
    const student = await this.studentsRepository.findOneBy({ email });
    if (!student) {
      throw new NotFoundException();
    }
    return student;
  }

  findByControlNumber(controlNumber: string): Promise<Student | null> {
    return this.studentsRepository.findOneBy({ controlNumber });
  }

  async findByControlNumberOrThrow(controlNumber: string): Promise<Student> {
    const student = await this.studentsRepository.findOneBy({ controlNumber });
    if (!student) {
      throw new NotFoundException();
    }
    return student;
  }

  findByPhone(phone: string): Promise<Student | null> {
    return this.studentsRepository.findOneBy({ phone });
  }

  async findByPhoneOrThrow(phone: string): Promise<Student> {
    const student = await this.studentsRepository.findOneBy({ phone });
    if (!student) {
      throw new NotFoundException();
    }
    return student;
  }

  findByGivenNames(givenNames: string): Promise<Student | null> {
    return this.studentsRepository.findOneBy({ givenNames });
  }

  async findByGivenNamesOrThrow(givenNames: string): Promise<Student> {
    const student = await this.studentsRepository.findOneBy({ givenNames });
    if (!student) {
      throw new NotFoundException();
    }
    return student;
  }

  findByPaternalSurname(paternalSurname: string): Promise<Student | null> {
    return this.studentsRepository.findOneBy({ paternalSurname });
  }

  async findByPaternalSurnameOrThrow(
    paternalSurname: string
  ): Promise<Student> {
    const student = await this.studentsRepository.findOneBy({
      paternalSurname,
    });
    if (!student) {
      throw new NotFoundException();
    }
    return student;
  }

  findByMaternalSurname(maternalSurname: string): Promise<Student | null> {
    return this.studentsRepository.findOneBy({ maternalSurname });
  }

  async findByMaternalSurnameOrThrow(
    maternalSurname: string
  ): Promise<Student> {
    const student = await this.studentsRepository.findOneBy({
      maternalSurname,
    });
    if (!student) {
      throw new NotFoundException();
    }
    return student;
  }

  async findPage(
    dto: StudentsPaginationQueryDto
  ): Promise<PaginationResult<Student>> {
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

    const [data, total] = await new StudentsPaginationQueryBuilder(
      this.studentsRepository
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
    const student = await this.studentsRepository.findOneBy({ email });
    if (student) {
      throw new ConflictException("Email already exists");
    }
  }

  async throwIfControlNumberExists(controlNumber: string): Promise<void> {
    const student = await this.studentsRepository.findOneBy({ controlNumber });
    if (student) {
      throw new ConflictException("Control number already exists");
    }
  }

  async create(dto: StudentsCreateDto): Promise<Student> {
    if (dto.email) {
      await this.throwIfEmailExists(dto.email);
    }
    await this.throwIfControlNumberExists(dto.controlNumber);
    const student = this.studentsRepository.create(dto);
    return await this.studentsRepository.save(student);
  }

  async update(id: string, dto: StudentsUpdateDto): Promise<Student> {
    const student = await this.findByIdOrThrow(id);
    if (dto.email) {
      await this.throwIfEmailExists(dto.email);
    }
    await this.throwIfControlNumberExists(dto.controlNumber);
    Object.assign(student, dto);
    return await this.studentsRepository.save(student);
  }

  async delete(id: string): Promise<void> {
    const student = await this.findByIdOrThrow(id);
    await this.studentsRepository.remove(student);
  }
}
