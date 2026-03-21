import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "src/common/interfaces/crud-service.interface";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { Repository } from "typeorm";
import { OtpCreateDto } from "./dtos/otp-create.dto";
import { OtpPaginationQueryDto } from "./dtos/otp-pagination-query.dto";
import { OtpUpdateDto } from "./dtos/otp-update.dto";
import { Otp } from "./otp.entity";
import { OtpPaginationQueryBuilder } from "./query-builders/otp-pagination-query.builder";

@Injectable()
export class OtpService implements CrudService<Otp> {
  constructor(
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>
  ) {}

  findById(id: string): Promise<Otp | null> {
    return this.otpRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: string): Promise<Otp> {
    const otp = await this.otpRepository.findOneBy({ id });
    if (!otp) {
      throw new NotFoundException("OTP not found");
    }
    return otp;
  }

  findByCode(code: string): Promise<Otp | null> {
    return this.otpRepository.findOneBy({ code });
  }

  async findByCodeOrThrow(code: string): Promise<Otp> {
    const otp = await this.otpRepository.findOneBy({ code });
    if (!otp) {
      throw new NotFoundException("OTP not found");
    }
    return otp;
  }

  async findPage(dto: OtpPaginationQueryDto): Promise<PaginationResult<Otp>> {
    const {
      limit,
      page,
      skip,
      sortBy,
      sortOrder,
      createdFrom,
      createdTo,
      search,
      updatedFrom,
      updatedTo,
      expiresFrom,
      expiresTo,
    } = dto;

    const [data, total] = await new OtpPaginationQueryBuilder(
      this.otpRepository
    )
      .withSearch(search)
      .withCreateDateRange(createdFrom, createdTo)
      .withUpdateDateRange(updatedFrom, updatedTo)
      .withExpiresDateRange(expiresFrom, expiresTo)
      .withSorting(sortBy, sortOrder)
      .withPagination(skip, limit)
      .build()
      .getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  create(dto: OtpCreateDto): Promise<Otp> {
    dto;
    const otp = this.otpRepository.create({
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Expires in 5 minutes
    });
    return this.otpRepository.save(otp);
  }

  async update(id: string, dto: OtpUpdateDto): Promise<Otp> {
    const otp = await this.findByIdOrThrow(id);
    Object.assign(otp, dto);
    return this.otpRepository.save(otp);
  }

  async delete(id: string): Promise<void> {
    await this.findByIdOrThrow(id);
    await this.otpRepository.softDelete({ id });
  }
}
