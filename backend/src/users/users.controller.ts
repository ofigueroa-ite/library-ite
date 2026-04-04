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
import { UsersCreateDto } from "./dtos/users-create.dto";
import { UsersPaginationQueryDto } from "./dtos/users-pagination-query.dto";
import { UsersUpdateDto } from "./dtos/users-update.dto";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CheckAbilities((ability) => ability.can(CaslAction.READ, CaslSubject.USERS))
  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findByIdOrThrow(id);
  }

  @CheckAbilities((ability) => ability.can(CaslAction.READ, CaslSubject.USERS))
  @Get()
  getAll(
    @Query() dto: UsersPaginationQueryDto
  ): Promise<PaginationResult<User>> {
    return this.usersService.findPage(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.CREATE, CaslSubject.USERS)
  )
  @Post()
  create(@Body() dto: UsersCreateDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.UPDATE, CaslSubject.USERS)
  )
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UsersUpdateDto
  ): Promise<User> {
    return this.usersService.update(id, dto);
  }

  @CheckAbilities((ability) =>
    ability.can(CaslAction.DELETE, CaslSubject.USERS)
  )
  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
