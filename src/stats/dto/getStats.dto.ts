import {IsDate, IsNumber, IsOptional, IsString} from 'class-validator';
import {Transform, Type} from 'class-transformer';
import {DateToDateTimePipe} from "../../helpers/pipes/date-to-date-time.pipe";


export class GetStatsDto {
  @Type(() => Number)
  @IsNumber()
  business_id;

  @IsOptional()
  // @Type(() => Date)
  // @Transform((value: any) => (value ? new DateToDateTimePipe().transform(value) : null))
  // @Transform( (value: any) => value ? (new DateToDateTimePipe()).transform(value): null)
  // @IsDate()
  starts_at;

  @IsOptional()
  // @Transform((value: any) => (value ? new DateToDateTimePipe().transform(value) : null))
  // @Transform( (value: any) => value ? (new DateToDateTimePipe()).transform(value): null)
  // @IsDate()
  ends_at;
}


