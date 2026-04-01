import {
  IsBoolean,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { CaslAction } from "src/casl/enums/casl-action.enum";
import { CaslSubject } from "src/casl/enums/casl-subject.enum";

export class PermissionsCreateDto {
  @IsString()
  @IsEnum(CaslAction)
  action: CaslAction;

  @IsOptional()
  @IsString()
  @IsEnum(CaslSubject)
  subject?: CaslSubject;

  @IsOptional()
  @IsJSON()
  conditions?: Record<string, unknown>;

  @IsOptional()
  @IsString({ each: true })
  fields?: string[];

  @IsOptional()
  @IsBoolean()
  inverted?: boolean;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  roleId: string;
}
