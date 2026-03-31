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
import { RolesCreateDto } from "./dtos/roles-create.dto";
import { RolesPaginationQueryDto } from "./dtos/roles-pagination-query.dto";
import { RolesUpdateDto } from "./dtos/roles-update.dto";
import { Role } from "./roles.entity";
import { RolesService } from "./roles.service";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<Role> {
    return this.rolesService.findByIdOrThrow(id);
  }

  @Get()
  getAll(
    @Query() dto: RolesPaginationQueryDto
  ): Promise<PaginationResult<Role>> {
    return this.rolesService.findPage(dto);
  }

  @Post()
  create(@Body() dto: RolesCreateDto): Promise<Role> {
    return this.rolesService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: RolesUpdateDto
  ): Promise<Role> {
    return this.rolesService.update(id, dto);
  }

  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.rolesService.delete(id);
  }
}
