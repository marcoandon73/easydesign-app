import {IsNumber, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export class GetAllRatingDto {

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  business_id;
}
