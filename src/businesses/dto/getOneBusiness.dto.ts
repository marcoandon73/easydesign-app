import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetOneBusinessDto {
  @Type(() => Number)
  @IsNumber()
  id;
}
