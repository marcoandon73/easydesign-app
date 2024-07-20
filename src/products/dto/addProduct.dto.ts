import {IsArray, IsNumber, IsOptional, IsString} from 'class-validator';
import { Type } from 'class-transformer';

export class AddProductDto {
  @Type(() => Number)
  @IsNumber()
  business_id;

  @Type(() => Number)
  @IsNumber()
  category_id;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price;


  photos;
  photo_thumb;

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
  @Type(() => Number)
  @IsNumber()
  order: number;

  @IsOptional()
  dimensions: Array<any> | any;
}
