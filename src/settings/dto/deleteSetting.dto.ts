import {  IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteSettingDto {
  @Type(() => Number)
  @IsNumber()
  id;

  @Type(() => Number)
  @IsNumber()
  business_id;
}
