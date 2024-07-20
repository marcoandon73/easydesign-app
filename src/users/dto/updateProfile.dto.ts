import {IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {Exclude, Type} from 'class-transformer';

export class UpdateProfileDto {

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id;

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
  avatar: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Exclude()
  @IsOptional()
  @IsString()
  password: string;

  @Exclude()
  @IsOptional()
  @IsString()
  old_password: string;

}
