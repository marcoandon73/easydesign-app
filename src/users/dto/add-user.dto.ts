import {IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import { Type} from 'class-transformer';

export class AddUserDto {

  @IsString()
  @IsOptional()
  lastname: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  salt: string;

  @IsDate()
  @IsOptional()
  email_verified_at: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  business_id;

  @Type(() => Number)
  @IsNumber()
  roleId;

}
