import {Type} from "class-transformer";
import {IsNumber, IsOptional} from "class-validator";


export class GetAllRulesDto {


  @Type(() => Number)
  @IsNumber()
  business_id;


}
