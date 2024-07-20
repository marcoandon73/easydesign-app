import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { Type } from 'class-transformer';


export class AddSettingDto {
  @Type(() => Number)
  @IsNumber()
  business_id;

  @IsOptional()
  @IsBoolean()
  multiple_products_by_order;

  @IsOptional()
  @IsBoolean()
  customizable_logo;

  @IsOptional()
  @IsBoolean()
  empty_bg;

  @IsOptional()
  @IsString()
  primary_color;

  @IsOptional()
  @IsString()
  secondary_color;

  @IsOptional()
  @IsBoolean()
  show_whatsapp;

  @IsOptional()
  @IsBoolean()
  show_facebook;

  @IsOptional()
  @IsBoolean()
  show_gmail;

  @IsOptional()
  @IsBoolean()
  show_ask_phone;

  @IsOptional()
  @IsBoolean()
  show_first_step;

  @IsOptional()
  @IsBoolean()
  show_second_step;

  @IsOptional()
  @IsBoolean()
  show_third_step;

  @IsOptional()
  @IsBoolean()
  show_shadow;

  @IsOptional()
  @IsString()
  unit;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  startup_step;

  @IsOptional()
  @IsString()
  lang;
}
