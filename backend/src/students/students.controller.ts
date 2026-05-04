import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CheckAbilities } from "src/casl/decorators/casl-check-abilites.decorator";
import { CaslAction } from "src/casl/enums/casl-action.enum";
import { CaslSubject } from "src/casl/enums/casl-subject.enum";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { StudentsCreateDto } from "./dtos/students-create.dto";
import { StudentsPaginationQueryDto } from "./dtos/students-pagination-query.dto";
import { StudentsUpdateDto } from "./dtos/students-update.dto";
import { Student } from "./students.entity";
import { StudentsService } from "./students.service";

@ApiBearerAuth()
@Controller("students")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.STUDENTS)
  )
  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<Student> {
    return this.studentsService.findByIdOrThrow(id);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.STUDENTS)
  )
  @Get()
  getAll(
    @Query() dto: StudentsPaginationQueryDto
  ): Promise<PaginationResult<Student>> {
    return this.studentsService.findPage(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.CREATE, CaslSubject.STUDENTS)
  )
  @Post()
  create(@Body() dto: StudentsCreateDto): Promise<Student> {
    return this.studentsService.create(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.UPDATE, CaslSubject.STUDENTS)
  )
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: StudentsUpdateDto
  ): Promise<Student> {
    return this.studentsService.update(id, dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.DELETE, CaslSubject.STUDENTS)
  )
  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.studentsService.delete(id);
  }
}
