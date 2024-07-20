import {  IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteOrderDto {
  @Type(() => Number)
  @IsNumber()
  id;

  @Type(() => Number)
  @IsNumber()
  business_id;
}
