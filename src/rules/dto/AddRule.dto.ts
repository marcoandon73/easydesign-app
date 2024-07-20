import {Type} from "class-transformer";
import {IsNumber, IsOptional} from "class-validator";


export class AddRuleDto {


  @Type(() => Number)
  @IsNumber()
  business_id;

  @Type(() => Number)
  @IsNumber()
  background_id;

  @IsOptional()
  @Type(() => Number)
  x;

  @IsOptional()
  @Type(() => Number)
  y;

  @IsOptional()
  @Type(() => Number)
  parent_width;

  @IsOptional()
  @Type(() => Number)
  parent_height;

  @IsOptional()
  @Type(() => Number)
  width;

  @IsOptional()
  @Type(() => Number)
  height;

  @IsOptional()
  is_favorite: boolean;

}
