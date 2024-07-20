import { IsNotEmpty, IsString } from 'class-validator';


export class CategoryDto {

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

  @IsNotEmpty()
  business_id: number;
}
