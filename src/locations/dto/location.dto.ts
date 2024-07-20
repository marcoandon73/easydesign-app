import { IsNotEmpty, IsString } from 'class-validator';


export class LocationDto {

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  country_name: string;

  @IsNotEmpty()
  @IsString()
  region: string;

  @IsString()
  native_country_name: string;

  @IsString()
  numericCode: string;

  @IsString()
  currency_code: string;

  @IsString()
  currency_symbol: string;

  @IsString()
  currency_name: string;

  @IsString()
  language: string;

  @IsString()
  language_native_name: string;

  @IsString()
  flag: string;

}
