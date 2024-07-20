import {IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {Exclude, Type} from 'class-transformer';

export class GetUserDto {

  @Type(() => Number)
  @IsNumber()
  id;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  business_id;

}
