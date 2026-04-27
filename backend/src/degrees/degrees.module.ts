import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CaslModule } from "src/casl/casl.module";
import { DegreesController } from "./degrees.controller";
import { Degree } from "./degrees.entity";
import { DegreesService } from "./degrees.service";

@Module({
  imports: [TypeOrmModule.forFeature([Degree]), CaslModule, AuthModule],
  providers: [DegreesService],
  controllers: [DegreesController],
  exports: [DegreesService],
})
export class DegreesModule {}
