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
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { OtpCreateDto } from "./dtos/otp-create.dto";
import { OtpPaginationQueryDto } from "./dtos/otp-pagination-query.dto";
import { OtpUpdateDto } from "./dtos/otp-update.dto";
import { Otp } from "./otp.entity";
import { OtpService } from "./otp.service";

@Controller("otp")
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Get(":id")
  get(@Param("id", ParseUUIDPipe) id: string): Promise<Otp> {
    return this.otpService.findByIdOrThrow(id);
  }

  @Get()
  getAll(@Query() dto: OtpPaginationQueryDto): Promise<PaginationResult<Otp>> {
    return this.otpService.findPage(dto);
  }

  @Post()
  create(@Body() dto: OtpCreateDto): Promise<Otp> {
    return this.otpService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: OtpUpdateDto
  ): Promise<Otp> {
    return this.otpService.update(id, dto);
  }

  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.otpService.delete(id);
  }
}
