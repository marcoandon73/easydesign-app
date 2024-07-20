import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import {Dimensions} from "../../products/entities/dimensions.entity";
import {SizesEntity} from "../entities/sizes.entity";

export class AddBgDto {
  @Type(() => Number)
  @IsNumber()
  business_id;

  photos;

  photo_thumb;

  @IsOptional()
  @Type(() => Number)
  order;

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
  price;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  category_id;

  @IsOptional()
  sizes: Array<SizesEntity> | null;
}
