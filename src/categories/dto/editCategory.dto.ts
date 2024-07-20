import { Type } from 'class-transformer';
import { Column } from 'typeorm';
import {IsNumber, IsOptional, IsString} from 'class-validator';

export class EditCategoryDto {
  @Type(() => Number)
  @IsNumber()
  business_id;

  @Type(() => Number)
  @IsNumber()
  id;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  category_id;

  @IsOptional()
  photo;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
