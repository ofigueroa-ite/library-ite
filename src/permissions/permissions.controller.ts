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
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { PermissionsCreateDto } from "./dtos/permissions-create.dto";
import { PermissionsPaginationQueryDto } from "./dtos/permissions-pagination-query.dto";
import { PermissionsUpdateDto } from "./dtos/permissions-update.dto";
import { Permission } from "./permissions.entity";
import { PermissionsService } from "./permissions.service";

@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<Permission> {
    return this.permissionsService.findByIdOrThrow(id);
  }

  @Get()
  getAll(
    @Query() dto: PermissionsPaginationQueryDto
  ): Promise<PaginationResult<Permission>> {
    return this.permissionsService.findPage(dto);
  }

  @Post()
  create(@Body() dto: PermissionsCreateDto): Promise<Permission> {
    return this.permissionsService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: PermissionsUpdateDto
  ): Promise<Permission> {
    return this.permissionsService.update(id, dto);
  }

  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.permissionsService.delete(id);
  }
}
