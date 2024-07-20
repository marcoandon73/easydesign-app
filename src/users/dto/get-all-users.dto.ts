import {IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {Exclude, Type} from 'class-transformer';

export class GetAllUsersDto {

  @Type(() => Number)
  @IsNumber()
  business_id;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize;

}
