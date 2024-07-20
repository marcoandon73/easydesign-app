import { IsEmail, IsString } from 'class-validator';

export class SendPasswordResetLinkDto {
  @IsString()
  @IsEmail()
  email: string;
}


