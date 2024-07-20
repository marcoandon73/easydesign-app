import {IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {Exclude, Type} from 'class-transformer';

export class UpdateUserDto {

  @Type(() => Number)
  @IsNumber()
  id;

  @IsOptional()
  @IsString()
  @IsOptional()
  lastname: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  firstname: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  business_id;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  isActive;

  @IsOptional()
  @IsString()
  password: string;

  @IsDate()
  @IsOptional()
  email_verified_at: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  roleId;
}
