import {IsBoolean, IsNumber, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export class GetAllBusinessDto {

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @IsOptional()
  @IsBoolean()
  all: boolean;
}
