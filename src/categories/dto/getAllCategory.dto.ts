import { Type } from 'class-transformer';
import { IsNumber, IsOptional} from 'class-validator';

export class GetAllCategoryDto {
  @Type(() => Number)
  @IsNumber()
  business_id;
}
