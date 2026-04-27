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
import { Degree } from "./degrees.entity";
import { DegreesService } from "./degrees.service";
import { DegreesCreateDto } from "./dtos/degrees-create.dto";
import { DegreesPaginationQueryDto } from "./dtos/degrees-pagination-query.dto";
import { DegreesUpdateDto } from "./dtos/degrees-update.dto";

@ApiBearerAuth()
@Controller("degrees")
export class DegreesController {
  constructor(private readonly degreesService: DegreesService) {}

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.GENDERS)
  )
  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<Degree> {
    return this.degreesService.findByIdOrThrow(id);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.GENDERS)
  )
  @Get()
  getAll(
    @Query() dto: DegreesPaginationQueryDto
  ): Promise<PaginationResult<Degree>> {
    return this.degreesService.findPage(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.CREATE, CaslSubject.GENDERS)
  )
  @Post()
  create(@Body() dto: DegreesCreateDto): Promise<Degree> {
    return this.degreesService.create(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.UPDATE, CaslSubject.GENDERS)
  )
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: DegreesUpdateDto
  ): Promise<Degree> {
    return this.degreesService.update(id, dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.DELETE, CaslSubject.GENDERS)
  )
  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.degreesService.delete(id);
  }
}
