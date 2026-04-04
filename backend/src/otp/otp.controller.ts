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
import { OtpCreateDto } from "./dtos/otp-create.dto";
import { OtpPaginationQueryDto } from "./dtos/otp-pagination-query.dto";
import { OtpUpdateDto } from "./dtos/otp-update.dto";
import { Otp } from "./otp.entity";
import { OtpService } from "./otp.service";

@ApiBearerAuth()
@Controller("otp")
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @CheckAbilities((ability) => ability.can(CaslAction.READ, CaslSubject.OTP))
  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<Otp> {
    return this.otpService.findByIdOrThrow(id);
  }

  @CheckAbilities((ability) => ability.can(CaslAction.READ, CaslSubject.OTP))
  @Get()
  getAll(@Query() dto: OtpPaginationQueryDto): Promise<PaginationResult<Otp>> {
    return this.otpService.findPage(dto);
  }

  @CheckAbilities((ability) => ability.can(CaslAction.CREATE, CaslSubject.OTP))
  @Post()
  create(@Body() dto: OtpCreateDto): Promise<Otp> {
    return this.otpService.create(dto);
  }

  @CheckAbilities((ability) => ability.can(CaslAction.UPDATE, CaslSubject.OTP))
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: OtpUpdateDto
  ): Promise<Otp> {
    return this.otpService.update(id, dto);
  }

  @CheckAbilities((ability) => ability.can(CaslAction.DELETE, CaslSubject.OTP))
  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.otpService.delete(id);
  }
}
