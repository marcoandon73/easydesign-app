import { IsNumber, IsOptional, IsString} from 'class-validator';
import { Type } from 'class-transformer';

export class AddCategoryDto {
  @Type(() => Number)
  @IsNumber()
  business_id;

  @IsString()
  name;

  @IsOptional()
  @IsString()
  description;

  @IsOptional()
  photo;
}
