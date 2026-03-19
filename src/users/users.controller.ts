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
import { PaginationResult } from "src/common/interfaces/pagination-result";
import { CreateUserDto } from "./dtos/create-user.dto";
import { QueryUserDto } from "./dtos/query-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
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
  getAll(@Query() dto: QueryUserDto): Promise<PaginationResult<User>> {
    return this.usersService.findAll(dto);
  }

  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, dto);
  }

  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
