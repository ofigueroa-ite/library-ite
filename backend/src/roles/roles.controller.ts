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
import { RolesCreateDto } from "./dtos/roles-create.dto";
import { RolesPaginationQueryDto } from "./dtos/roles-pagination-query.dto";
import { RolesUpdateDto } from "./dtos/roles-update.dto";
import { Role } from "./roles.entity";
import { RolesService } from "./roles.service";

@ApiBearerAuth()
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @CheckAbilities((ability) => ability.can(CaslAction.READ, CaslSubject.ROLES))
  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<Role> {
    return this.rolesService.findByIdOrThrow(id);
  }

  @CheckAbilities((ability) => ability.can(CaslAction.READ, CaslSubject.ROLES))
  @Get()
  getAll(
    @Query() dto: RolesPaginationQueryDto
  ): Promise<PaginationResult<Role>> {
    return this.rolesService.findPage(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.CREATE, CaslSubject.ROLES)
  )
  @Post()
  create(@Body() dto: RolesCreateDto): Promise<Role> {
    return this.rolesService.create(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.UPDATE, CaslSubject.ROLES)
  )
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: RolesUpdateDto
  ): Promise<Role> {
    return this.rolesService.update(id, dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.DELETE, CaslSubject.ROLES)
  )
  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.rolesService.delete(id);
  }
}
