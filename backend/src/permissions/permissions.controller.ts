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
import { PermissionsCreateDto } from "./dtos/permissions-create.dto";
import { PermissionsPaginationQueryDto } from "./dtos/permissions-pagination-query.dto";
import { PermissionsUpdateDto } from "./dtos/permissions-update.dto";
import { Permission } from "./permissions.entity";
import { PermissionsService } from "./permissions.service";

@ApiBearerAuth()
@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.PERMISSIONS)
  )
  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<Permission> {
    return this.permissionsService.findByIdOrThrow(id);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.READ, CaslSubject.PERMISSIONS)
  )
  @Get()
  getAll(
    @Query() dto: PermissionsPaginationQueryDto
  ): Promise<PaginationResult<Permission>> {
    return this.permissionsService.findPage(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.CREATE, CaslSubject.PERMISSIONS)
  )
  @Post()
  create(@Body() dto: PermissionsCreateDto): Promise<Permission> {
    return this.permissionsService.create(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.UPDATE, CaslSubject.PERMISSIONS)
  )
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: PermissionsUpdateDto
  ): Promise<Permission> {
    return this.permissionsService.update(id, dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.DELETE, CaslSubject.PERMISSIONS)
  )
  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.permissionsService.delete(id);
  }
}
