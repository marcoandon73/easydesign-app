import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetAllBgDto {
  @Type(() => Number)
  @IsNumber()
  business_id;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page;

  @IsOptional()
  @Type(() => Number)
  category_id;
}
