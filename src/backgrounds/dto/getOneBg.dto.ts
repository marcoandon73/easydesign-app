import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetOneBgDto {
  @Type(() => Number)
  @IsNumber()
  id;

  @Type(() => Number)
  @IsNumber()
  business_id;
}
