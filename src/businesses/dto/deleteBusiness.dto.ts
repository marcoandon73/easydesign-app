import {IsNumber, IsString} from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteBusinessDto {
  @Type(() => Number)
  @IsNumber()
  id;

  @IsString()
  slug;
}
