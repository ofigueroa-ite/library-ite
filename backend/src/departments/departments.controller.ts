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
import { Department } from "./departments.entity";
import { DepartmentsService } from "./departments.service";
import { DepartmentsCreateDto } from "./dtos/departments-create.dto";
import { DepartmentsPaginationQueryDto } from "./dtos/departments-pagination-query.dto";
import { DepartmentsUpdateDto } from "./dtos/departments-update.dto";

@ApiBearerAuth()
@Controller("departments")
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.DEPARTMENTS)
  )
  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<Department> {
    return this.departmentsService.findByIdOrThrow(id);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.DEPARTMENTS)
  )
  @Get()
  getAll(
    @Query() dto: DepartmentsPaginationQueryDto
  ): Promise<PaginationResult<Department>> {
    return this.departmentsService.findPage(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.CREATE, CaslSubject.DEPARTMENTS)
  )
  @Post()
  create(@Body() dto: DepartmentsCreateDto): Promise<Department> {
    return this.departmentsService.create(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.UPDATE, CaslSubject.DEPARTMENTS)
  )
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: DepartmentsUpdateDto
  ): Promise<Department> {
    return this.departmentsService.update(id, dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.DELETE, CaslSubject.DEPARTMENTS)
  )
  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.departmentsService.delete(id);
  }
}
