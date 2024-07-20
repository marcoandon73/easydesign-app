import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  token: string;

  @IsString()
  new_password: string;

}
