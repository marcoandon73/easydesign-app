import { Type } from 'class-transformer';
import {IsArray, IsDate, IsEnum, IsNumber, IsOptional, ValidateNested} from 'class-validator';
import {OrderStatus, OrderType} from "../enums/enums";
import {DimensionProductDTO} from "./dimensionProduct.dto";

export class GetAllOrderDto {
  @Type(() => Number)
  @IsNumber()
  business_id;

  @IsOptional()
  status: any;

  @IsOptional()
  type: any;

  @IsOptional()
  starts_at;

  @IsOptional()
  ends_at;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page;

}
