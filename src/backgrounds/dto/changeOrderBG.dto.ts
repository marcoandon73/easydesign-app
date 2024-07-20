import {IsArray, IsNumber} from 'class-validator';
import { Type } from 'class-transformer';

interface orderBy {
  id: number;
  order: number;
}
export class ChangeOrderBGDto {
  @Type(() => Number)
  @IsNumber()
  business_id;

  @IsArray()
  orders: orderBy[];
}
