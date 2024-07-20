import { Type } from 'class-transformer';
import { Column } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SizesEntity } from '../entities/sizes.entity';

export class EditBgDto {
  @Type(() => Number)
  @IsNumber()
  id;

  @Type(() => Number)
  @IsNumber()
  business_id;

  @IsOptional()
  photo: string | null;

  @IsOptional()
  @Type(() => Number)
  order;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  link: string;

  @IsOptional()
  @IsString()
  dominating_color: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nbr_clicks: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nbr_views: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nbr_submits: number;

  @IsOptional()
  sizes: Array<SizesEntity> | null;
}
