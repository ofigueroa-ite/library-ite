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
import { UsersCreateDto } from "./dtos/users-create.dto";
import { UsersPaginationQueryDto } from "./dtos/users-pagination-query.dto";
import { UsersUpdateDto } from "./dtos/users-update.dto";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findByIdOrThrow(id);
  }

  @Get()
  getAll(
    @Query() dto: UsersPaginationQueryDto
  ): Promise<PaginationResult<User>> {
    return this.usersService.findPage(dto);
  }

  @Post()
  create(@Body() dto: UsersCreateDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UsersUpdateDto
  ): Promise<User> {
    return this.usersService.update(id, dto);
  }

  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
