import { Type } from 'class-transformer';
import {IsEmail, IsEmpty, IsNumber, IsObject, IsOptional, IsString} from 'class-validator';

export class EditBusinessDto {

  @Type(() => Number)
  @IsNumber()
  id;

  @IsOptional()
  @IsString()
  name;

  @IsOptional()
  @IsString()
  description;

  @IsOptional()
  @IsString()
  website;

  @IsOptional()
  @IsEmail()
  email;

  @IsOptional()
  logo;

  @IsOptional()
  @IsString()
  messenger_link;

  @IsOptional()
  @IsString()
  phone;

  @IsOptional()
  @IsString()
  address;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  location_id;

  @IsOptional()
  @IsString()
  action_block: 'enable' | 'disable' | null;
}
