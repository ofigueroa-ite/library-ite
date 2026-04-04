import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { CaslAction } from "src/casl/enums/casl-action.enum";
import { CaslSubject } from "src/casl/enums/casl-subject.enum";

export class PermissionsUpdateDto {
  @IsOptional()
  @IsEnum(CaslAction)
  action?: CaslAction;

  @IsOptional()
  @IsEnum(CaslSubject)
  subject?: CaslSubject;

  @IsOptional()
  @IsObject()
  conditions?: Record<string, unknown>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fields?: string[];

  @IsOptional()
  @IsBoolean()
  inverted?: boolean;

  @IsOptional()
  @IsUUID()
  roleId?: string;
}
