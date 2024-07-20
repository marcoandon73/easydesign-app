import { Type } from 'class-transformer';
import {IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';

export class GetOneBusinessAsGuestDto {
  @IsString()
  business_name: string;

  @IsOptional()
  @IsBoolean()
  full_phone;

  @IsOptional()
  @IsBoolean()
  with_categories;

  @IsOptional()
  @IsBoolean()
  with_bg_categories;
}
