import { IsNotEmpty, IsString } from 'class-validator';


export class BusinessDto {

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsString()
  description: string;

  @IsString()
  phone: string;

  @IsString()
  messenger_link: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  website: string;


  location_id: number;

  @IsString()
  address: string;
}
