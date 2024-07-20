import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetOneSettingDto {

  @Type(() => Number)
  @IsNumber()
  business_id;
}
