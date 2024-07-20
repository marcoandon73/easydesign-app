import { IsNotEmpty, IsString } from 'class-validator';


export class RolesDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  role: string;
}
