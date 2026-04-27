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
import { GendersCreateDto } from "./dtos/genders-create.dto";
import { GendersPaginationQueryDto } from "./dtos/genders-pagination-query.dto";
import { GendersUpdateDto } from "./dtos/genders-update.dto";
import { Gender } from "./genders.entity";
import { GendersService } from "./genders.service";

@ApiBearerAuth()
@Controller("genders")
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.GENDERS)
  )
  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<Gender> {
    return this.gendersService.findByIdOrThrow(id);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.GENDERS)
  )
  @Get()
  getAll(
    @Query() dto: GendersPaginationQueryDto
  ): Promise<PaginationResult<Gender>> {
    return this.gendersService.findPage(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.CREATE, CaslSubject.GENDERS)
  )
  @Post()
  create(@Body() dto: GendersCreateDto): Promise<Gender> {
    return this.gendersService.create(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.UPDATE, CaslSubject.GENDERS)
  )
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: GendersUpdateDto
  ): Promise<Gender> {
    return this.gendersService.update(id, dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.DELETE, CaslSubject.GENDERS)
  )
  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.gendersService.delete(id);
  }
}
