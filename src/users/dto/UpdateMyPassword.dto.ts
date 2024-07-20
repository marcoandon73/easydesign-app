import {IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {Exclude, Type} from 'class-transformer';

export class UpdateMyPasswordDto {

  @Exclude()
  @IsOptional()
  @IsString()
  password: string;

  @Exclude()
  @IsOptional()
  @IsString()
  old_password: string;

}
