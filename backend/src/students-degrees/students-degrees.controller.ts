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
import { StudentsDegreesCreateDto } from "./dtos/students-degrees-create.dto";
import { StudentsDegreesPaginationQueryDto } from "./dtos/students-degrees-pagination-query.dto";
import { StudentsDegreesUpdateDto } from "./dtos/students-degrees-update.dto";
import { StudentsDegrees } from "./students-degrees.entity";
import { StudentsDegreesService } from "./students-degrees.service";

@ApiBearerAuth()
@Controller("students-degrees")
export class StudentsDegreesController {
  constructor(
    private readonly studentsDegreesService: StudentsDegreesService
  ) {}

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.STUDENTS_DEGREES)
  )
  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<StudentsDegrees> {
    return this.studentsDegreesService.findByIdOrThrow(id);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.STUDENTS_DEGREES)
  )
  @Get()
  getAll(
    @Query() dto: StudentsDegreesPaginationQueryDto
  ): Promise<PaginationResult<StudentsDegrees>> {
    return this.studentsDegreesService.findPage(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.CREATE, CaslSubject.STUDENTS_DEGREES)
  )
  @Post()
  create(@Body() dto: StudentsDegreesCreateDto): Promise<StudentsDegrees> {
    return this.studentsDegreesService.create(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.UPDATE, CaslSubject.STUDENTS_DEGREES)
  )
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: StudentsDegreesUpdateDto
  ): Promise<StudentsDegrees> {
    return this.studentsDegreesService.update(id, dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.DELETE, CaslSubject.STUDENTS_DEGREES)
  )
  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.studentsDegreesService.delete(id);
  }
}
