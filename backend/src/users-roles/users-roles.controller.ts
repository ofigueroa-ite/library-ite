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
import { UsersRolesCreateDto } from "./dtos/users-roles-create.dto";
import { UsersRolesPaginationQueryDto } from "./dtos/users-roles-pagination-query.dto";
import { UsersRolesUpdateDto } from "./dtos/users-roles-update.dto";
import { UsersRoles } from "./users-roles.entity";
import { UsersRolesService } from "./users-roles.service";

@ApiBearerAuth()
@Controller("users-roles")
export class UsersRolesController {
  constructor(private readonly usersRolesService: UsersRolesService) {}

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.USERS_ROLES)
  )
  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<UsersRoles> {
    return this.usersRolesService.findByIdOrThrow(id);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.USERS_ROLES)
  )
  @Get()
  getAll(
    @Query() dto: UsersRolesPaginationQueryDto
  ): Promise<PaginationResult<UsersRoles>> {
    return this.usersRolesService.findPage(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.CREATE, CaslSubject.USERS_ROLES)
  )
  @Post()
  create(@Body() dto: UsersRolesCreateDto): Promise<UsersRoles[]> {
    return this.usersRolesService.create(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.UPDATE, CaslSubject.USERS_ROLES)
  )
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UsersRolesUpdateDto
  ): Promise<UsersRoles> {
    return this.usersRolesService.update(id, dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.DELETE, CaslSubject.USERS_ROLES)
  )
  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.usersRolesService.delete(id);
  }
}
