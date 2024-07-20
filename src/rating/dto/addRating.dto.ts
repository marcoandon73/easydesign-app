import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import {Transform, Type} from 'class-transformer';



export class AddRatingDto {

  @Type(() => Number)
  @IsNumber()
  business_id;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  rating_percent;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  user_id;

  @IsOptional()
  @IsString()
  message: string;

}
