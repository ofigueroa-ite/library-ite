import { createHmac, randomBytes } from "node:crypto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { createElement } from "react";
import { CrudService } from "src/common/interfaces/crud-service.interface";
import { EnvironmentVariables } from "src/common/interfaces/environment-variables.interface";
import { PaginationResult } from "src/common/interfaces/pagination-result.interface";
import { MailerService } from "src/mailer/mailer.service";
import { OtpTemplate } from "src/mailer/templates/otp.template";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { OtpCreateDto } from "./dtos/otp-create.dto";
import { OtpPaginationQueryDto } from "./dtos/otp-pagination-query.dto";
import { OtpUpdateDto } from "./dtos/otp-update.dto";
import { Otp } from "./otp.entity";
import { OtpPaginationQueryBuilder } from "./query-builders/otp-pagination-query.builder";

@Injectable()
export class OtpService implements CrudService<Otp> {
  private readonly otpCharset: string;
  private readonly otpLength: number;
  private readonly otpSecret: string;

  constructor(
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService
  ) {
    this.otpCharset = this.configService.get<string>("OTP_CHARSET", {
      infer: true,
    });
    this.otpLength = this.configService.get<number>("OTP_LENGTH", {
      infer: true,
    });
    this.otpSecret = this.configService.get<string>("OTP_SECRET", {
      infer: true,
    });
  }

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

  findByUserId(userId: string): Promise<Otp | null> {
    return this.otpRepository.findOneBy({ userId });
  }

  async findByUserIdOrThrow(userId: string): Promise<Otp> {
    const otp = await this.otpRepository.findOneBy({ userId });
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

  async create(dto: OtpCreateDto): Promise<Otp> {
    const user = await this.usersService.findByIdOrThrow(dto.userId);
    await this.otpRepository.softDelete({ userId: dto.userId });
    const otpTtlMinutes = this.configService.get("OTP_TTL_MINUTES");
    const code = this.generateCode();
    const otp = this.otpRepository.create({
      hash: this.hmac(code),
      expiresAt: new Date(Date.now() + otpTtlMinutes * 60 * 1000),
      userId: dto.userId,
    });
    const savedOtp = await this.otpRepository.save(otp);
    const emailHtml = await this.mailerService.renderTemplate(
      createElement(OtpTemplate, { code, user })
    );
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Your OTP code",
      html: emailHtml,
    });
    return savedOtp;
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

  generateCode(
    length: number = this.otpLength,
    charset: string = this.otpCharset
  ): string {
    const maxValid = Math.floor(256 / charset.length) * charset.length;
    const result: string[] = [];

    while (result.length < length) {
      const bytes = randomBytes(length * 2);
      for (const b of bytes) {
        if (result.length === length) {
          break;
        }
        if (b < maxValid) {
          result.push(charset[b % charset.length]);
        }
      }
    }

    return result.join("");
  }

  hmac(otp: string, secret: string = this.otpSecret): string {
    return createHmac("sha256", secret).update(otp).digest("hex");
  }
}
