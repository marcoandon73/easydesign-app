import { Type } from 'class-transformer';
import { IsNumber, IsOptional} from 'class-validator';

export class GetAllProductDto {
  @Type(() => Number)
  @IsNumber()
  business_id;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  category_id;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page;
}
