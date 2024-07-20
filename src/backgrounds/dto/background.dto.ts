import { IsNotEmpty, IsString } from 'class-validator';



export class BackgroundDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @IsNotEmpty()
  business_id: number;

}
