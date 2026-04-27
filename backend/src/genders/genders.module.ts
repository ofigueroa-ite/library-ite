import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CaslModule } from "src/casl/casl.module";
import { GendersController } from "./genders.controller";
import { Gender } from "./genders.entity";
import { GendersService } from "./genders.service";

@Module({
  imports: [TypeOrmModule.forFeature([Gender]), CaslModule, AuthModule],
  providers: [GendersService],
  controllers: [GendersController],
  exports: [GendersService],
})
export class GendersModule {}
