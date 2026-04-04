import { Module } from "@nestjs/common";
import { PermissionsModule } from "src/permissions/permissions.module";
import { RolesModule } from "src/roles/roles.module";
import { UsersModule } from "src/users/users.module";
import { UsersRolesModule } from "src/users-roles/users-roles.module";
import { SeederService } from "./seeder.service";

@Module({
  imports: [UsersModule, RolesModule, PermissionsModule, UsersRolesModule],
  providers: [SeederService],
})
export class SeederModule {}
