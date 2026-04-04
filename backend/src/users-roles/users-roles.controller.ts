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
import { UsersRolesCreateDto } from "./dtos/users-roles-create.dto";
import { UsersRolesPaginationQueryDto } from "./dtos/users-roles-pagination-query.dto";
import { UsersRolesUpdateDto } from "./dtos/users-roles-update.dto";
import { UsersRoles } from "./users-roles.entity";
import { UsersRolesService } from "./users-roles.service";

@Controller("users-roles")
export class UsersRolesController {
  constructor(private readonly usersRolesService: UsersRolesService) {}

  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<UsersRoles> {
    return this.usersRolesService.findByIdOrThrow(id);
  }

  @Get()
  getAll(
    @Query() dto: UsersRolesPaginationQueryDto
  ): Promise<PaginationResult<UsersRoles>> {
    return this.usersRolesService.findPage(dto);
  }

  @Post()
  create(@Body() dto: UsersRolesCreateDto): Promise<UsersRoles> {
    return this.usersRolesService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UsersRolesUpdateDto
  ): Promise<UsersRoles> {
    return this.usersRolesService.update(id, dto);
  }

  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.usersRolesService.delete(id);
  }
}
