import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CaslModule } from "src/casl/casl.module";
import { DepartmentsController } from "./departments.controller";
import { Department } from "./departments.entity";
import { DepartmentsService } from "./departments.service";

@Module({
  imports: [TypeOrmModule.forFeature([Department]), CaslModule, AuthModule],
  providers: [DepartmentsService],
  controllers: [DepartmentsController],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
