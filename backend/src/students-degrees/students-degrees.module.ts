import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentsDegreesController } from "./students-degrees.controller";
import { StudentsDegrees } from "./students-degrees.entity";
import { StudentsDegreesService } from "./students-degrees.service";

@Module({
  imports: [TypeOrmModule.forFeature([StudentsDegrees])],
  providers: [StudentsDegreesService],
  controllers: [StudentsDegreesController],
  exports: [StudentsDegreesService],
})
export class StudentsDegreesModule {}
