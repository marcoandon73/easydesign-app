import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DimensionProductDTO {
  @Type(() => Number)
  @IsNumber()
  dimension_id: number;

  @Type(() => Number)
  @IsNumber()
  product_id: number;
}
