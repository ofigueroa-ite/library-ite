import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRolesController } from "./users-roles.controller";
import { UsersRoles } from "./users-roles.entity";
import { UsersRolesService } from "./users-roles.service";

@Module({
  imports: [TypeOrmModule.forFeature([UsersRoles])],
  providers: [UsersRolesService],
  controllers: [UsersRolesController],
})
export class UsersRolesModule {}
