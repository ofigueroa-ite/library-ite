import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SortOrder } from "src/common/enums/sort-order";
import { PaginationResult } from "src/common/interfaces/pagination-result";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateOtpDto } from "./dtos/create-otp.dto";
import { OtpSortBy, QueryOtpDto } from "./dtos/query-otp.dto";
import { UpdateOtpDto } from "./dtos/update-otp.dto";
import { Otp } from "./otp.entity";

class OtpQueryBuilder {
  private readonly query: SelectQueryBuilder<Otp>;
  constructor(repository: Repository<Otp>) {
    this.query = repository.createQueryBuilder("otp");
  }

  withSearch(search?: string): this {
    if (search) {
      this.query.where("code ILIKE :search", { search: `%${search}%` });
    }
    return this;
  }

  withCreateDateRange(createdFrom?: Date, createdTo?: Date): this {
    if (createdFrom) {
      this.query.andWhere("user.createdAt >= :createdFrom", { createdFrom });
    }
    if (createdTo) {
      this.query.andWhere("user.createdAt <= :createdTo", { createdTo });
    }
    return this;
  }

  withUpdateDateRange(updatedFrom?: Date, updatedTo?: Date): this {
    if (updatedFrom) {
      this.query.andWhere("user.updatedAt >= :updatedFrom", { updatedFrom });
    }
    if (updatedTo) {
      this.query.andWhere("user.updatedAt <= :updatedTo", { updatedTo });
    }
    return this;
  }

  withExpiresDateRange(expiresFrom?: Date, expiresTo?: Date): this {
    if (expiresFrom) {
      this.query.andWhere("expiresAt >= :expiresFrom", { expiresFrom });
    }
    if (expiresTo) {
      this.query.andWhere("expiresAt <= :expiresTo", { expiresTo });
    }
    return this;
  }

  withSorting(sortBy: OtpSortBy, sortOrder: SortOrder): this {
    this.query.orderBy(sortBy, sortOrder);
    return this;
  }

  withPagination(skip: number, limit: number): this {
    this.query.skip(skip).take(limit);
    return this;
  }

  build(): SelectQueryBuilder<Otp> {
    return this.query;
  }
}

@Injectable()
export class OtpService {
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

  async findPage(dto: QueryOtpDto): Promise<PaginationResult<Otp>> {
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

    const [data, total] = await new OtpQueryBuilder(this.otpRepository)
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

  create(dto: CreateOtpDto): Promise<Otp> {
    dto;
    const otp = this.otpRepository.create({
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Expires in 5 minutes
    });
    return this.otpRepository.save(otp);
  }

  async update(id: string, dto: UpdateOtpDto): Promise<Otp> {
    const otp = await this.findByIdOrThrow(id);
    Object.assign(otp, dto);
    return this.otpRepository.save(otp);
  }

  async delete(id: string): Promise<void> {
    await this.findByIdOrThrow(id);
    await this.otpRepository.softDelete({ id });
  }
}
