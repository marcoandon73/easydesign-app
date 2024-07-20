import {IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {Exclude, Type} from 'class-transformer';

export class UsersDTO {

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

  @IsString()
  @IsOptional()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Exclude()
  @IsString()
  password: string;

  @Exclude()
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
}
