import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CaslModule } from "src/casl/casl.module";
import { RolesController } from "./roles.controller";
import { Role } from "./roles.entity";
import { RolesService } from "./roles.service";

@Module({
  imports: [TypeOrmModule.forFeature([Role]), CaslModule, AuthModule],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
