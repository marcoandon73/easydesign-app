import { Type } from 'class-transformer';
import { Column } from 'typeorm';
import {IsArray, IsNumber, IsOptional, IsString} from 'class-validator';
import {Dimensions} from "../entities/dimensions.entity";

export class EditProductDto {
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
  @Type(() => Number)
  @IsNumber()
  price;

  @IsOptional()
  @IsString()
  photo: string;

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
  @Type(() => Number)
  @IsNumber()
  order: number;

  @IsOptional()
  dimensions: Array<Dimensions> | null;
}
