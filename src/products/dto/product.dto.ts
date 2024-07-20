import { IsNotEmpty, IsString } from 'class-validator';


export class ProductDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  photo: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  price: number;

  @IsNotEmpty()
  category_id: string;

}
