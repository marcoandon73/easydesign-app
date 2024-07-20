import {Type} from "class-transformer";
import {IsNumber} from "class-validator";

export class GetAllSettingDto {

  @Type(() => Number)
  @IsNumber()
  business_id;
}
